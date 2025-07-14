
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Shield, 
  Bell, 
  Settings, 
  Lock, 
  CreditCard, 
  FileText, 
  UserX,
  Home,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  AlertTriangle,
  DollarSign,
  Building,
  Trash2,
  Plus,
  Edit
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccountSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [fraudAlerts, setFraudAlerts] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [paperlessStatements, setPaperlessStatements] = useState(true);
  const [internationalUsage, setInternationalUsage] = useState(false);

  const linkedAccounts = [
    { id: 1, name: "Chase Checking", type: "External", status: "Active" },
    { id: 2, name: "Wells Fargo Savings", type: "External", status: "Active" },
  ];

  const accountNicknames = [
    { id: 1, original: "Checking Account ***1234", nickname: "Main Checking", isDefault: true },
    { id: 2, original: "Savings Account ***5678", nickname: "Emergency Fund", isDefault: false },
    { id: 3, original: "Savings Account ***9012", nickname: "Vacation Fund", isDefault: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SecureBank</h1>
            </div>
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Return Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h2>
          <p className="text-gray-600">Manage your banking preferences and security settings</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Michael Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" defaultValue="1985-06-15" />
                  </div>
                </div>

                <Separator />
                
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.smith@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>

                <Separator />
                
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Addresses
                </h4>
                
                <div className="space-y-4">
                  <h5 className="font-medium">Residential Address</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Street Address" defaultValue="123 Main Street" />
                    <Input placeholder="Apartment/Unit" defaultValue="Apt 4B" />
                    <Input placeholder="City" defaultValue="New York" />
                    <Input placeholder="State" defaultValue="NY" />
                    <Input placeholder="ZIP Code" defaultValue="10001" />
                    <Input placeholder="Country" defaultValue="United States" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="differentMailing" />
                    <Label htmlFor="differentMailing">Different mailing address</Label>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Personal Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Login Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input 
                            id="currentPassword" 
                            type={showPassword ? "text" : "password"} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>
                    
                    {twoFactorEnabled && (
                      <div className="space-y-3 ml-4">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="sms2fa" name="2fa" defaultChecked />
                          <Label htmlFor="sms2fa">SMS Text Message</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="email2fa" name="2fa" />
                          <Label htmlFor="email2fa">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="app2fa" name="2fa" />
                          <Label htmlFor="app2fa">Authenticator App</Label>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Security Questions */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Security Questions</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question 1</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a security question" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pet">What was the name of your first pet?</SelectItem>
                            <SelectItem value="school">What elementary school did you attend?</SelectItem>
                            <SelectItem value="street">What street did you grow up on?</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Your answer" />
                      </div>
                      <div className="space-y-2">
                        <Label>Question 2</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a security question" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mother">What is your mother's maiden name?</SelectItem>
                            <SelectItem value="car">What was your first car?</SelectItem>
                            <SelectItem value="city">In what city were you born?</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Your answer" />
                      </div>
                    </div>
                    <Button variant="outline">Update Security Questions</Button>
                  </div>

                  <Separator />

                  {/* Biometric Login */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Biometric Login
                    </h4>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Fingerprint & Face Recognition</p>
                        <p className="text-sm text-gray-600">Enable biometric authentication for mobile app</p>
                      </div>
                      <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Preferences */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Customize how you receive alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Alert Methods */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Alert Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4" />
                        <div>
                          <p className="font-medium">SMS Alerts</p>
                          <p className="text-sm text-gray-600">Receive text message alerts</p>
                        </div>
                      </div>
                      <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-600">Mobile app notifications</p>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Transaction Alerts */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Transaction Alerts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lowBalanceThreshold">Low Balance Alert ($)</Label>
                      <Input id="lowBalanceThreshold" type="number" defaultValue="100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="largeTransactionThreshold">Large Transaction Alert ($)</Label>
                      <Input id="largeTransactionThreshold" type="number" defaultValue="1000" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security Alerts */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Fraud & Security Alerts
                  </h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Suspicious Activity Alerts</p>
                      <p className="text-sm text-gray-600">Get notified of unusual account activity</p>
                    </div>
                    <Switch checked={fraudAlerts} onCheckedChange={setFraudAlerts} />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Management */}
          <TabsContent value="accounts">
            <div className="space-y-6">
              {/* Linked Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Linked External Accounts
                  </CardTitle>
                  <CardDescription>
                    Manage connections to other bank accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {linkedAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-gray-600">{account.type} Account</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                            {account.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add External Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Nicknames */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Nicknames</CardTitle>
                  <CardDescription>
                    Customize your account names and set your default account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accountNicknames.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{account.original}</p>
                          <Input 
                            defaultValue={account.nickname} 
                            className="mt-2"
                            placeholder="Account nickname"
                          />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {account.isDefault && (
                            <Badge>Default</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy & Data Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Privacy & Data Settings
                </CardTitle>
                <CardDescription>
                  Control how your data is used and shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Data Sharing Preferences</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-gray-600">Receive promotional offers and product updates</p>
                    </div>
                    <Switch checked={marketingOptIn} onCheckedChange={setMarketingOptIn} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Third-Party Access</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage apps and services that have access to your account data
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Mint</p>
                        <p className="text-sm text-gray-600">Personal finance management</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Plaid</p>
                        <p className="text-sm text-gray-600">Financial data aggregation</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment & Transfer Settings */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment & Transfer Settings
                </CardTitle>
                <CardDescription>
                  Manage your payment preferences and transfer limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auto-Pay Setup */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Auto-Pay Setup</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Electric Bill - ConEd</p>
                        <p className="text-sm text-gray-600">Due: 15th of each month • $125.00</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Auto-Pay
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Transfer Limits */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Transfer Limits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dailyLimit">Daily Transfer Limit ($)</Label>
                      <Input id="dailyLimit" type="number" defaultValue="5000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyLimit">Monthly Transfer Limit ($)</Label>
                      <Input id="monthlyLimit" type="number" defaultValue="50000" />
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Card Controls */}
          <TabsContent value="cards">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Card Management
                </CardTitle>
                <CardDescription>
                  Control your debit and credit cards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Card List */}
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Debit Card •••• 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dailyATMLimit">Daily ATM Limit ($)</Label>
                        <Input id="dailyATMLimit" type="number" defaultValue="500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dailyPurchaseLimit">Daily Purchase Limit ($)</Label>
                        <Input id="dailyPurchaseLimit" type="number" defaultValue="2500" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">International Usage</p>
                        <p className="text-sm text-gray-600">Enable for foreign transactions</p>
                      </div>
                      <Switch checked={internationalUsage} onCheckedChange={setInternationalUsage} />
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Freeze Card</Button>
                      <Button variant="outline" size="sm">Report Lost/Stolen</Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Card Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents & Statements */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents & Statements
                </CardTitle>
                <CardDescription>
                  Manage your statements and tax documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Statement Preferences */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Statement Preferences</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Paperless Statements</p>
                      <p className="text-sm text-gray-600">Receive statements electronically</p>
                    </div>
                    <Switch checked={paperlessStatements} onCheckedChange={setPaperlessStatements} />
                  </div>
                </div>

                <Separator />

                {/* Tax Documents */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Tax Documents</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">1099-INT 2023</p>
                        <p className="text-sm text-gray-600">Interest Income Statement</p>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">1099-INT 2022</p>
                        <p className="text-sm text-gray-600">Interest Income Statement</p>
                      </div>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Document Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Close Account Section */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <UserX className="h-5 w-5" />
              Close Account
            </CardTitle>
            <CardDescription className="text-red-600">
              Permanently close your banking account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Account closure requires customer support assistance. Please contact us to begin the process.
            </p>
            <Button variant="destructive">
              Request Account Closure
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
