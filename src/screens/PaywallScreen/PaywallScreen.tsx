import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking, ActivityIndicator, Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStyle } from "./style";
import { SVG } from "@/theme/assets/icons";
import { AppText, Header, Space } from "@/components/atoms";
import { useTheme } from "@/theme";
import { normalizeWidth, pixelSizeX, pixelSizeY } from "@/utils/sizes";
import Purchases from 'react-native-purchases';
import { fetchUserDataLocal } from "@/store/authSlice/authApiService";
import { useQueryClient } from "@tanstack/react-query";
import { ensureRevenueCatConfigured, isRevenueCatReady } from "@/utils/purchases";

const IOS_PRODUCT_ID = "paper_pod_monthly";
const ANDROID_PRODUCT_ID = "paper_pod_monthly:monthly";
const PRODUCT_ID = Platform.OS === "android" ? ANDROID_PRODUCT_ID : IOS_PRODUCT_ID;
const OFFERING_IDENTIFIERS = ["Monthly", "monthly", "default"];

// TODO: Replace these URLs with your actual live pages
const PRIVACY_POLICY_URL = "https://paperpod.bycloud.ai/privacy.html";
const TERMS_OF_USE_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

const PaywallScreen = () => {
    const { colors } = useTheme();
    const queryClient = useQueryClient();

    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<"Free" | "Creator">("Free");
    const styles = useStyle()
    const [compPackages, setCompPackages] = useState<any[]>([]);
    const [packageLoading, setPackageLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [restorePurchasedLoading, setRestorePurchasedLoading] = useState(false);
    const [revenueCatReady, setRevenueCatReady] = useState(isRevenueCatReady());
    const plans = {
        Free: {
            price: "$0/month",
            description:
                "Perfect for casual listeners and learners.\nWith the Free plan, you get access to a curated selection of AI-generated research podcasts every week.",
            features: [
                "Included Characters: 20,000",
                "Audio Quality: 128 kbps, 44.1 kHz",
                "Access weekly AI-generated podcasts",
                "Clean, minimal user interface",
                "Download episodes for offline listening",
            ],
        },
        Creator: {
            price: "$5/month",
            description:
                "Ready to bring your own research to life?\nUpload your own academic papers and turn them into personalized AI voiceovers.",
            features: [
                "Included Characters: 60,000",
                "Audio Quality: 128 kbps, 44.1 kHz",
                "Everything in the Free Plan",
                "Upload your own research papers (PDF)",
                "Add to your personal audio library",
                "Access to future premium tools and updates",
            ],
        },
    };
    useEffect(() => {
        void initializePaywall();
    }, []);
    const initializePaywall = async () => {
      const configured = await ensureRevenueCatConfigured();
      setRevenueCatReady(configured);

      if (!configured) {
        Alert.alert(
          "Error",
          "Subscriptions are temporarily unavailable. Please try again later.",
        );
        return;
      }

      await getPackages();
    };
    const getPackages = async () => {
      try {
        setPackageLoading(true);
        console.log("[RevenueCat] offerings fetch start");
        const offerings = await Purchases.getOfferings();
        console.log("🚀 ~ getPackages ~ offerings.current:", offerings?.current);
        console.log("🚀 ~ getPackages ~ offerings.all keys:", Object.keys(offerings?.all ?? {}));

        const fallbackOffering = OFFERING_IDENTIFIERS
          .map((key) => offerings?.all?.[key])
          .find(Boolean);

        const currentOffering = offerings?.current ?? fallbackOffering ?? null;

        if (currentOffering?.availablePackages?.length) {
          console.log(
            "🚀 ~ getPackages ~ available packages:",
            currentOffering.availablePackages.map((pkg: any) => ({
              identifier: pkg.identifier,
              productIdentifier: pkg.product.identifier,
              price: pkg.product.priceString,
            })),
          );

          setCompPackages(currentOffering.availablePackages);
        } else {
          console.debug("No available packages found in current or fallback offerings");
          Alert.alert(
            "Subscription Unavailable",
            "No subscription package is available right now. Please verify your RevenueCat offering and store product setup.",
          );
        }
      } catch (error: any) {
        console.log("[RevenueCat] offerings fetch failure", error);
        console.debug("🚀 ~ getPackages ~ full error:", JSON.stringify(error, null, 2));
        console.debug("🚀 ~ getPackages ~ readable error:", error?.message);
        Alert.alert(
          "Error",
          error?.message ?? "Unable to load subscription packages. Please try again later.",
        );
      } finally {
        setPackageLoading(false);
      }
    };
  const refreshPostSubscriptionData = async () => {
    try {
      await fetchUserDataLocal();
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ['getPublicArticles'] }),
        queryClient.invalidateQueries({ queryKey: ['myArticles'] }),
      ]);
    } catch (error) {
      console.debug("🚀 ~ refreshPostSubscriptionData ~ error:", error);
    }
  };

     const makePurchase = async (item: string) => {
    if (!revenueCatReady) {
      Alert.alert("Error", "Subscriptions are not ready yet. Please try again.");
      return;
    }

    const sub = compPackages.find((obj: any) => obj.identifier === item);
    console.debug("🚀 ~ makePurchase ~ sub:", sub);

    if (!sub) {
      Alert.alert("Error", "Unable to find the selected subscription package.");
      return;
    }

    setPaymentLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(sub);
      console.debug("🚀 ~ makePurchase ~ customerInfo:", customerInfo);

      const activeSubscriptions = customerInfo.activeSubscriptions ?? [];
      const hasActiveSubscription =
        activeSubscriptions.includes(PRODUCT_ID) ||
        activeSubscriptions.includes(IOS_PRODUCT_ID) ||
        activeSubscriptions.includes(ANDROID_PRODUCT_ID);

      console.debug("🚀 ~ makePurchase ~ hasActiveSubscription:", hasActiveSubscription);

      if (hasActiveSubscription) {
        await refreshPostSubscriptionData();
        Alert.alert("Success", "Your subscription is now active.");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    } catch (e: any) {
      console.debug("🚀 ~ makePurchase ~ e:", e);
      if (e?.userCancelled) {
        // User canceled the purchase; no need to show an error
      } else {
        Alert.alert("Error", e?.message ?? "Something went wrong during purchase.");
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  const onPressRestorePurchased = async () => {
    if (!revenueCatReady) {
      Alert.alert("Error", "Subscriptions are not ready yet. Please try again.");
      return;
    }

    setRestorePurchasedLoading(true);
    try {
      const resotre = await Purchases.restorePurchases();
      console.log("restored new ones", resotre);

      const customerInfo = await Purchases.getCustomerInfo();
      console.log(
        "🚀 ~ PaywallScreen ~ customerInfo activeSubscriptions:",
        customerInfo?.activeSubscriptions,
      );

      const activeSubscriptions = customerInfo.activeSubscriptions ?? [];
      const hasActiveSubscription =
        activeSubscriptions.includes(PRODUCT_ID) ||
        activeSubscriptions.includes(IOS_PRODUCT_ID) ||
        activeSubscriptions.includes(ANDROID_PRODUCT_ID);

      if (hasActiveSubscription) {
        await refreshPostSubscriptionData();
        Alert.alert("Success", "Subscription restored successfully.");
        navigation.goBack();
      } else {
        Alert.alert(
          "Info",
          "Your subscription has expired or there is no active subscription to restore.",
        );
      }
    } catch (err: any) {
      console.debug("🚀 ~ onPressRestorePurchased ~ err:", err);
      Alert.alert("Error", err?.message ?? "Something went wrong while restoring purchases.");
    } finally {
      setRestorePurchasedLoading(false);
    }
  };
    const currentPlan = plans[activeTab];
    const creatorPackage = compPackages[0] as any | undefined;
    const creatorPriceFromStore = creatorPackage?.product?.priceString ?? plans.Creator.price;
    return (
        <View style={styles.container}>
            {/* Header */}

            <Header extraStyle={{ marginTop: pixelSizeY( 55)}} renderLeftFunc={() => {
                return <TouchableOpacity
                    style={{ paddingRight: pixelSizeX(12), width: normalizeWidth(50), paddingVertical: pixelSizeY(7) }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <SVG.ArrowLeft />
                </TouchableOpacity>
            }} title="Plans" />

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === "Free" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("Free")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "Free" && styles.activeTabText,
                        ]}
                    >
                        Free
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === "Creator" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("Creator")}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === "Creator" && styles.activeTabText,
                        ]}
                    >
                        Creator
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Price Card */}
                <View style={styles.card}>
                    <Text style={styles.price}>
                      {activeTab === "Creator" ? creatorPriceFromStore : currentPlan.price}
                    </Text>
                    <Text style={styles.description}>{currentPlan.description}</Text>
                </View>

                {/* Features */}
                <View style={styles.features}>
                    <AppText fontSize={18} fontFamily="medium" title="Features" color={colors.white} />
                    <Space mB={20} />

                    {currentPlan.features.map((feature, idx) => (
                        <View key={idx} style={styles.featureItem}>
                            <Text style={styles.featureText}>{feature}</Text>

                            <View style={{ transform: [{ rotate: '270deg' }] }}>
                                <SVG.DownArrow fill={colors.white} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Continue with Free Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={!revenueCatReady || paymentLoading || packageLoading}
                      onPress={() => {
                        if (activeTab === "Free") {
                          setActiveTab("Creator");
                          return;
                        }

                        const creatorPackageIdentifier =
                          compPackages.find((pkg: any) => pkg.identifier === "$rc_monthly")?.identifier ??
                          compPackages[0]?.identifier;

                        if (!creatorPackageIdentifier) {
                          Alert.alert(
                            "Subscription Unavailable",
                            "No subscription package is loaded yet. Please try again in a moment.",
                          );
                          return;
                        }

                        makePurchase(creatorPackageIdentifier);
                      }}
                      style={styles.upgradeButton}
                    >
                      {paymentLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text style={styles.upgradeButtonText}>
                          {activeTab === "Creator" ? "Subscribe to Creator Plan" : "Upgrade to Creator"}
                        </Text>
                      )}
                    </TouchableOpacity>
                </View>

                <Space mB={4} />

                <TouchableOpacity
                  disabled={!revenueCatReady || restorePurchasedLoading}
                  onPress={onPressRestorePurchased}
                  style={{ alignSelf: "center", paddingVertical: pixelSizeY(8) }}
                >
                  {restorePurchasedLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={[styles.tabText, { textDecorationLine: "underline" }]}>
                      Restore Purchases
                    </Text>
                  )}
                </TouchableOpacity>

                <Space mB={8} />

                <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
                    style={{ marginHorizontal: pixelSizeX(4), paddingVertical: pixelSizeY(4) }}
                  >
                    <Text style={[styles.featureText, { textDecorationLine: "underline" }]}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.featureText}>•</Text>

                  <TouchableOpacity
                    onPress={() => Linking.openURL(TERMS_OF_USE_URL)}
                    style={{ marginHorizontal: pixelSizeX(4), paddingVertical: pixelSizeY(4) }}
                  >
                    <Text style={[styles.featureText, { textDecorationLine: "underline" }]}>
                      Terms of Use
                    </Text>
                  </TouchableOpacity>
                </View>

                <Space mB={8} />

                <Text style={[styles.featureText, { textAlign: "center", opacity: 0.7 }]}>
                  Subscription automatically renews unless canceled at least 24 hours before the end of the current period.
                  Payment will be charged to your account at confirmation of purchase. You can manage or cancel your
                  subscription in your account settings.
                </Text>
            </ScrollView>
        </View>
    );
};

export default PaywallScreen
