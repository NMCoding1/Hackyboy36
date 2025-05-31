import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, PartyPopper } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore"

const VolleyballAnnouncement = () => {
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([])
  const [playerName, setPlayerName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const playersRef = collection(db, "volleyballPlayers")

  useEffect(() => {
    const q = query(playersRef, orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }))
      setPlayers(fetched)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isDialogOpen])

  const handleJoinGame = async () => {
    const trimmed = playerName.trim()
    if (
      trimmed &&
      !players.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      await addDoc(playersRef, {
        name: trimmed,
        timestamp: Date.now(),
      })
    }
    setPlayerName("")
    setIsDialogOpen(false)
  }

  const handleRemovePlayer = async (id: string) => {
    await deleteDoc(doc(playersRef, id))
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <Card className="bg-yellow-100 border-l-4 border-yellow-500 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <PartyPopper className="text-yellow-600" />
            <h2 className="text-lg font-semibold text-yellow-800">Volleyball Match Announcement!</h2>
          </div>
          <p className="mt-2 text-yellow-700">
            Hey everyone! We’re organizing a volleyball match this weekend. If you’re interested in playing, please add your name below!
          </p>
          <div className="mt-4">
            <Button onClick={() => setIsDialogOpen(true)}>Join the Game</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-blue-600" />
            <h3 className="text-lg font-semibold">Players</h3>
          </div>
          <ScrollArea className="h-40 border rounded-md p-2">
            {players.length > 0 ? (
              <ul className="space-y-1">
                {players.map((p) => (
                  <li key={p.id} className="flex justify-between items-center">
                    <span>{p.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemovePlayer(p.id)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No players have joined yet.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the Volleyball Game</DialogTitle>
          </DialogHeader>
          <Input
            ref={inputRef}
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoinGame()}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleJoinGame}>Join</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default VolleyballAnnouncement