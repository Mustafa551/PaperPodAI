import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStyle } from "./style";
import { SVG } from "@/theme/assets/icons";
import { AppText, Header, Space } from "@/components/atoms";
import { useTheme } from "@/theme";
// import { PaywallScreen } from "..";
// import { Icon } from "react-native-vector-icons/Ionicons"; // Example if you use icons

const PaywallScreen = () => {
    const { colors } = useTheme();

    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<"Free" | "Creator">("Free");
    const styles = useStyle()

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

    const currentPlan = plans[activeTab];

    return (
        <View style={styles.container}>
            {/* Header */}
            {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace with your Icon */}
            {/* <Text style={styles.backArrow}>←</Text> */}
            {/* </TouchableOpacity> */}
            {/* <Text style={styles.title}>Plans</Text> */}
            {/* </View> */}
            <Header title="Plans" />

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
                    <Text style={styles.price}>{currentPlan.price}</Text>
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
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue with Free Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade to Creator</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};

export default PaywallScreen
