import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Wallet,
  LogOut,
  Trophy,
  Users,
  Play,
  ChevronDown,
  Star,
  Clock,
  ArrowRightLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/lib/utils";

interface GameRoom {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  entryFee: number;
  status: "waiting" | "playing" | "completed";
}

const mockGameRooms: Record<string, GameRoom[]> = {
  beginner: [
    {
      id: "b1",
      name: "Beginner Room #1",
      players: 3,
      maxPlayers: 4,
      entryFee: 10,
      status: "waiting",
    },
    {
      id: "b2",
      name: "Beginner Room #2",
      players: 2,
      maxPlayers: 2,
      status: "playing",
      entryFee: 10,
    },
    {
      id: "b3",
      name: "Beginner Tournament",
      players: 6,
      maxPlayers: 8,
      entryFee: 10,
      status: "waiting",
    },
  ],
  intermediate: [
    {
      id: "i1",
      name: "Intermediate Room #1",
      players: 1,
      maxPlayers: 2,
      entryFee: 50,
      status: "waiting",
    },
    {
      id: "i2",
      name: "Intermediate Room #2",
      players: 2,
      maxPlayers: 2,
      status: "playing",
      entryFee: 50,
    },
  ],
  advanced: [
    {
      id: "a1",
      name: "Advanced Room #1",
      players: 1,
      maxPlayers: 2,
      entryFee: 100,
      status: "waiting",
    },
    {
      id: "a2",
      name: "Pro Tournament",
      players: 12,
      maxPlayers: 16,
      entryFee: 100,
      status: "playing",
    },
  ],
};

export default function Dashboard() {
  const { toast } = useToast();
  const {
    isConnected,
    account,
    balance,
    snrBalance,
    connectWallet,
    disconnectWallet,
  } = useWallet();
  const [, setLocation] = useLocation();
  const [selectedRoom, setSelectedRoom] = useState<GameRoom | null>(null);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");

  useEffect(() => {
    // Redirect to home if not connected
    if (!isConnected && account === null) {
      toast({
        title: "ไม่พบการเชื่อมต่อกระเป๋า",
        description: "กรุณาเชื่อมต่อกระเป๋าก่อนเข้าใช้งาน Dashboard",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/");
      }, 3000);
    }
  }, [isConnected, account, setLocation, toast]);

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleJoinGame = (room: GameRoom) => {
    // Check if room is full
    if (room.players >= room.maxPlayers) {
      toast({
        title: "ห้องเต็ม",
        description: "ไม่สามารถเข้าร่วมได้ กรุณาเลือกห้องอื่น",
        variant: "destructive",
      });
      return;
    }

    // Check if room is already playing
    if (room.status === "playing") {
      toast({
        title: "เกมเริ่มไปแล้ว",
        description: "ไม่สามารถเข้าร่วมได้ กรุณาเลือกห้องอื่น",
        variant: "destructive",
      });
      return;
    }

    // Check if player has enough SNR tokens
    if (!snrBalance || parseFloat(snrBalance) < room.entryFee) {
      toast({
        title: "SNR ไม่เพียงพอ",
        description: `คุณต้องการ ${room.entryFee} SNR เพื่อเข้าร่วมห้องนี้`,
        variant: "destructive",
      });
      return;
    }

    setSelectedRoom(room);
    setShowJoinDialog(true);
  };

  const confirmJoinGame = () => {
    if (!selectedRoom) return;

    // Here we would implement the actual game joining logic with smart contract
    toast({
      title: "เข้าร่วมเกมสำเร็จ",
      description: `คุณได้เข้าร่วมห้อง ${selectedRoom.name} แล้ว`,
    });
    setShowJoinDialog(false);
    // In a real app, we would redirect to the game
  };

  if (!isConnected && account === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">เชื่อมต่อกระเป๋าก่อนเข้าใช้งาน</h2>
            <p className="text-muted-foreground mb-6">
              กรุณาเชื่อมต่อกระเป๋า MetaMask เพื่อเข้าใช้งาน Dashboard
            </p>
            <Button onClick={handleConnectWallet} className="mx-auto">
              <Wallet className="mr-2 h-4 w-4" />
              เชื่อมต่อกระเป๋า
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 relative rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background"></div>
              </div>
              <span className="font-mono text-white text-lg font-bold">SNR</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-card px-4 py-2 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-mono">
                  {shortenAddress(account || "")}
                </span>
              </div>
              <div className="bg-card px-4 py-2 rounded-lg">
                <span className="text-sm font-mono text-primary">
                  {snrBalance || "0"} SNR
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={disconnectWallet}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ยอดเหรียญ SNR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{snrBalance || "0"} SNR</div>
              <p className="text-xs text-muted-foreground mt-1">
                ≈ ${snrBalance ? parseFloat(snrBalance) * 0.05 : 0} USD
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                ซื้อเพิ่มเติม
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                เกมที่ชนะ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span>อันดับ #0</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Star className="mr-2 h-4 w-4" />
                ดูสถิติ
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ทัวร์นาเมนต์
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 text-primary" />
                <span>เร็วๆ นี้</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                ลงทะเบียน
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Game Rooms */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">ห้องเกม</h2>

          <Tabs
            defaultValue="beginner"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="beginner">
                <div className="flex items-center gap-2">
                  <span>มือใหม่</span>
                  <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                    10 SNR
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="intermediate">
                <div className="flex items-center gap-2">
                  <span>ปานกลาง</span>
                  <div className="bg-purple-600/20 text-purple-600 px-2 py-0.5 rounded-full text-xs">
                    50 SNR
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="advanced">
                <div className="flex items-center gap-2">
                  <span>มืออาชีพ</span>
                  <div className="bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded-full text-xs">
                    100 SNR
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>

            {Object.entries(mockGameRooms).map(([level, rooms]) => (
              <TabsContent key={level} value={level} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <Card key={room.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{room.name}</CardTitle>
                          <div
                            className={`px-2 py-1 rounded-full text-xs ${
                              room.status === "waiting"
                                ? "bg-green-500/20 text-green-500"
                                : room.status === "playing"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-blue-500/20 text-blue-500"
                            }`}
                          >
                            {room.status === "waiting"
                              ? "รอผู้เล่น"
                              : room.status === "playing"
                              ? "กำลังเล่น"
                              : "จบเกม"}
                          </div>
                        </div>
                        <CardDescription>
                          ผู้เล่น {room.players}/{room.maxPlayers}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-primary/20 px-2 py-1 rounded-full text-xs text-primary">
                            {room.entryFee} SNR
                          </div>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          <div className="bg-green-500/20 px-2 py-1 rounded-full text-xs text-green-500">
                            {room.entryFee * 1.5} SNR
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          variant={
                            room.status === "waiting" ? "default" : "outline"
                          }
                          disabled={
                            room.status !== "waiting" ||
                            room.players >= room.maxPlayers
                          }
                          onClick={() => handleJoinGame(room)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {room.status === "waiting"
                            ? "เข้าร่วม"
                            : room.status === "playing"
                            ? "กำลังเล่น"
                            : "จบเกมแล้ว"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* How to Play */}
        <div className="bg-card rounded-lg p-6 border border-border mb-8">
          <h2 className="text-xl font-bold mb-4">วิธีการเล่น</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-3">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">1. เชื่อมต่อกระเป๋า</h3>
              <p className="text-muted-foreground text-sm">
                เชื่อมต่อกระเป๋า MetaMask และเติมเหรียญ SNR
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-600 rounded-full flex items-center justify-center mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">2. เลือกห้อง</h3>
              <p className="text-muted-foreground text-sm">
                เลือกระดับความยากและจำนวน SNR ที่ต้องการเดิมพัน
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-3">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">3. เล่นและรับรางวัล</h3>
              <p className="text-muted-foreground text-sm">
                เล่นเกมและรับเหรียญ SNR เมื่อชนะการแข่งขัน
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Join Game Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการเข้าร่วมเกม</DialogTitle>
            <DialogDescription>
              คุณกำลังจะเข้าร่วมห้อง {selectedRoom?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ค่าเข้าร่วม:</span>
              <span className="font-semibold">{selectedRoom?.entryFee} SNR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">โอกาสรับรางวัล:</span>
              <span className="font-semibold">{selectedRoom && selectedRoom.entryFee * 1.5} SNR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ผู้เล่น:</span>
              <span className="font-semibold">{selectedRoom?.players}/{selectedRoom?.maxPlayers}</span>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <p className="text-xs text-muted-foreground">
                การเข้าร่วมเกมจะทำให้คุณถูกหักเหรียญ SNR ตามค่าเข้าร่วม และจะได้รับคืนพร้อมรางวัลเมื่อชนะเกม
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={confirmJoinGame}>
              <Play className="mr-2 h-4 w-4" />
              ยืนยันการเข้าร่วม
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}