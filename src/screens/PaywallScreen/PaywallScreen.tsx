import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStyle } from "./style";
import { SVG } from "@/theme/assets/icons";
import { AppText, Header, Space } from "@/components/atoms";
import { useTheme } from "@/theme";
import { normalizeWidth, pixelSizeX, pixelSizeY } from "@/utils/sizes";
import Purchases from 'react-native-purchases';

const PRODUCT_ID = "paper_pod_monthly"; // RevenueCat product identifier for the monthly subscription

// TODO: Replace these URLs with your actual live pages
const PRIVACY_POLICY_URL = "https://example.com/privacy";
const TERMS_OF_USE_URL = "https://example.com/terms";

const PaywallScreen = () => {
    const { colors } = useTheme();

    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<"Free" | "Creator">("Free");
    const styles = useStyle()
    const [packages, setPackages] = useState<any[]>([]);
    console.log('🚀 ~ PaywallScreen ~ packages:', packages);
    const [compPackages, setCompPackages] = useState<any[]>([]);
    const [packageLoading, setPackageLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [restorePurchasedLoading, setRestorePurchasedLoading] = useState(false);
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
        getPackages();
    }, []);
    const getPackages = async () => {
      try {
        setPackageLoading(true);
        const offerings = await Purchases.getOfferings();
        console.log("🚀 ~ getPackages ~ offerings:", offerings);

        // Prefer the current offering; if null, fall back to the Monthly offering in `all`
        const currentOffering =
          offerings.current ??
          (offerings.all && (offerings.all as any).Monthly) ??
          null;

        if (currentOffering && currentOffering.availablePackages.length !== 0) {
          const getPackagesData = currentOffering.availablePackages.map((val: any) => ({
            price: val.product.priceString,
            identifier: val.identifier,
            title: val.product.title,
            description: val.product.description,
            productId: val.product.identifier,
            raw: val,
          }));
          setPackages(getPackagesData);
          setCompPackages(currentOffering.availablePackages);
        } else {
          console.debug("No available packages found in current or Monthly offering");
        }
      } catch (error: any) {
        console.debug("🚀 ~ getPackages ~ error:", error);
        Alert.alert("Error", "Unable to load subscription packages. Please try again later.");
      } finally {
        setPackageLoading(false);
      }
    };
     const makePurchase = async (item: string) => {
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

      const hasActiveSubscription = customerInfo.activeSubscriptions?.includes(PRODUCT_ID);
      console.debug("🚀 ~ makePurchase ~ hasActiveSubscription:", hasActiveSubscription);

      if (hasActiveSubscription) {
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
    setRestorePurchasedLoading(true);
    try {
      const resotre = await Purchases.restorePurchases();
      console.log("restored new ones", resotre);

      const customerInfo = await Purchases.getCustomerInfo();
      console.log(
        "🚀 ~ PaywallScreen ~ customerInfo activeSubscriptions:",
        customerInfo?.activeSubscriptions,
      );

      const hasActiveSubscription = customerInfo.activeSubscriptions?.includes(PRODUCT_ID);

      if (hasActiveSubscription) {
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
    const handleContinue = () => {
        // Handle continue action based on the selected plan
        if (activeTab === "Free") {
            setActiveTab("Creator")
        } else {
            // Logic for upgrading to Creator plan
        }
    };
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
                      disabled={paymentLoading || packageLoading}
                      onPress={() => {
                        if (activeTab === "Free") {
                          setActiveTab("Creator");
                          return;
                        }
                        // We only have one package ($rc_monthly) in your current RevenueCat setup
                        makePurchase("$rc_monthly");
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
                  disabled={restorePurchasedLoading}
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
