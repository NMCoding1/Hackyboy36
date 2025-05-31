"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, VibrateIcon as Volleyball } from "lucide-react"

export default function VolleyballAnnouncement() {
  const [players, setPlayers] = useState<string[]>([])
  const [playerName, setPlayerName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleJoinGame = () => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      setPlayers([...players, playerName.trim()])
      setPlayerName("")
      setIsDialogOpen(false)
    }
  }

  const handleRemovePlayer = (nameToRemove: string) => {
    setPlayers(players.filter((name) => name !== nameToRemove))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Volleyball className="h-8 w-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">Volleyball Game</h1>
          </div>
          <p className="text-lg text-gray-600">Join us for an exciting volleyball match!</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Announcement Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-gray-900">Game Announcement</CardTitle>
                <CardDescription className="text-base">
                  Get ready for some competitive volleyball action!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Date & Time</p>
                      <p className="text-gray-700">Saturday, June 15th</p>
                      <p className="text-gray-700">6:00 PM - 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <MapPin className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-700">Central Sports Complex</p>
                      <p className="text-gray-700">Court #2, Main Building</p>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                        <Users className="mr-2 h-5 w-5" />
                        Join the Game
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Join the Volleyball Game</DialogTitle>
                        <DialogDescription>Enter your name to join the player list for this game.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleJoinGame()}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleJoinGame}
                          disabled={!playerName.trim() || players.includes(playerName.trim())}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Join Game
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p>{"🏐"} Bring your own water bottle and comfortable sports attire</p>
                  <p>
                    {"⚡"} All skill levels welcome - let{"'"}s have fun!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player List */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  Players Joining
                  <Badge variant="secondary" className="ml-auto">
                    {players.length}
                  </Badge>
                </CardTitle>
                <CardDescription>See who{"'"}s coming to the game</CardDescription>
              </CardHeader>
              <CardContent>
                {players.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No players yet</p>
                    <p className="text-sm">Be the first to join!</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {players.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-semibold text-sm">
                              {player.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{player}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePlayer(player)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
