"use client"

import { useState, useEffect } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Heart } from "lucide-react"

import { UserProfile } from "@/lib/profile/types"
import ProfileHeader from "./ProfileHeader"
import AccountTab from "./tabs/AccountTab"
import PreferencesTab from "./tabs/PreferencesTab"
import SubscriptionTab from "./tabs/SubscriptionTab"

export default function ProfilePage() {
  const userInfo = useQuery(api.auth.getUserInfo)
  const userProfileData = useQuery(api.userProfiles.getUserProfile, { email: userInfo?.email || "" })
  const updateUserProfile = useMutation(api.userProfiles.updateUserProfile)

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    if (userProfileData) {
      setProfile({
        name: userInfo?.name || "",
        email: userInfo?.email || userProfileData.email,
        preferences: userProfileData.preferences || [],
        snackStyle: userProfileData.snackStyle || "fun",
        joinedDate: new Date().toISOString(),
        totalSnacksReceived: 0,
        subscription: userProfileData.subscription ?? true,
        language: userProfileData.language || "en",
      })
    }
  }, [userInfo, userProfileData])

  const handleProfileUpdate = async (updatedProfile: Partial<UserProfile>) => {
    if (!profile) return;
    setIsLoading(true);
    try {
      // console.log(updatedProfile.preferences, profile.preferences)
      await updateUserProfile({
        email: profile.email,
        preferences: updatedProfile.preferences ?? profile.preferences,
        snackStyle: updatedProfile.snackStyle ?? profile.snackStyle,
        language: updatedProfile.language ?? profile.language,
        subscription: updatedProfile.subscription ?? profile.subscription,
      });
      setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
      // In a real app, show a toast notification instead of an alert.
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="w-8 h-8 animate-spin text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-lg font-medium text-purple-600">Loading profile...</p>
        </div>
      </div>

    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <ProfileHeader profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account and learning preferences</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="account" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2 cursor-pointer">
                <Heart className="h-4 w-4" />
                Subscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <AccountTab
                name={profile.name}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </TabsContent>

            <TabsContent value="preferences">
              <PreferencesTab
                profile={profile}
                setProfile={setProfile}
                onUpdate={handleProfileUpdate}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="subscription">
              <SubscriptionTab
                profile={profile}
                onUpdate={handleProfileUpdate}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
