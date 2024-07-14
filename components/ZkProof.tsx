
"use client"

import { useState } from "react"
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

// Define the structure of individual token objects
interface Token {
    event: {
        id: string;
    };
    id: string;
    owner: {
        id: string;
    };
}

// Define the structure of the API response
interface TokenResponse {
    tokens: Token[];
    tokensCount: number;
}
interface NounsResponse {
    wallet: string;
    is_nouns_holder: number;
}
interface BoredApeResponse {
    wallet: string;
    is_ape_holder: number;
}

export default function ZkProofComponent() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [patricioUpdated, setPatricioUpdated] = useState(false)
  const [nounsUpdated, setNounsUpdated] = useState(false)
  const [boredApeUpdated, setBoredApeUpdated] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [dataPatricio, setDataPatricio] = useState<TokenResponse | null>(null);
  const [dataNouns, setDataNouns] = useState<NounsResponse | null>(null);
  const [dataBoredApe, setDataBoredApe] = useState<BoredApeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { primaryWallet } = useDynamicContext();

  function updatePatricio() {
    fetchData();
  }

  async function fetchData() {
    const res = await fetch(`/api/updateData?wallet=${primaryWallet?.address}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.ok) {
        const result = await res.json();
        console.log("result",result);
        setPatricioUpdated(true);
        setDataPatricio(result);
    } else {
        const error = await res.json();
        setPatricioUpdated(false);
        console.log("error",error);
    }
  }
  async function fetchNounsData() {
    const res = await fetch(`/api/updateNouns?wallet=${primaryWallet?.address}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.ok) {
        const result = await res.json();
        console.log("result",result);
        setNounsUpdated(true);
        if (result.is_nouns_holder == 0) {
            setNounsUpdated(false);
        }
        setDataNouns(result);
    } else {
        const error = await res.json();
        setNounsUpdated(false);
        console.log("error",error);
    }
  }

  async function fetchBoredApesData() {
    const res = await fetch(`/api/updateBoredApes?wallet=${primaryWallet?.address}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.ok) {
        const result = await res.json();
        console.log("result",result);
        setBoredApeUpdated(true);
        if (result.is_nouns_holder == 0) {
            setBoredApeUpdated(false);
        }
        setDataBoredApe(result);
    } else {
        const error = await res.json();
        setBoredApeUpdated(false);
        console.log("error",error);
    }
  }

  function onSuccess(result: any) {
    console.log("onSuccess: ", result);
  }

  async function handleVerify(result: any) {
    console.log("handleVerify: ", result);
    const res = await fetch(`/api/worldCoinHandleVerification?proof=${result?.proof}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (res.ok) {
        const result = await res.json();
        console.log("result",result);
    } else {
        const error = await res.json();
        console.log("error",error);
    }    
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">My zkProofs</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 mb-2">

        <IDKitWidget
            app_id="app_9a3569098c2172a03c9a32a46d3895f4" // obtained from the Developer Portal
            action="connectprod" // obtained from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            verification_level={VerificationLevel.Orb}
        >
            {({ open }) => 
                // This is the button that will open the IDKit modal
                <button className="w-full rounded-lg   " onClick={open}>
                    <img
                        src="/worldcoin.png"
                        alt="worldCoin"
                        className="w-full h-auto rounded-lg cursor-pointer m-1"
                        onClick={() => setSelectedImage(1)}
                    />
                </button>
            }
        </IDKitWidget>             

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/polygon-id.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(2)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">Polygon ID</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/polygon-id.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You don&apos;t have Polygon ID verification yet.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/patricio.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(3)}
              />
            </DialogTrigger>

                  <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                      <DialogHeader className="flex items-center justify-between w-full">
                          <DialogTitle className="text-2xl font-bold">Patricio&apos;s Poap</DialogTitle>
                      </DialogHeader>

                      {!patricioUpdated && (
                          <div>
                              none
                          </div>
                      )}
                      {patricioUpdated && (
                          <Badge variant="secondary" className="px-4 py-2 rounded-full">
                              Generated
                          </Badge>
                      )}
                      <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                          <img src="/patricio.png" alt="Selected" className="w-full h-auto" />
                      </div>
                      <div className="text-center mb-4">
                          {!patricioUpdated && (
                              <p className="text-lg text-center text-muted-foreground">You have not met Patricio</p>
                          )}
                          {patricioUpdated && (
                              <>
                                  <p>You have met Patricio</p>
                                  <p className="text-2xl font-bold">{dataPatricio?.tokensCount} times</p>
                              </>
                          )}
                      </div>
                      <DialogFooter className="w-full">
                          <Button className="w-full bg-orange-500 text-white rounded-lg py-2" onClick={updatePatricio}>Update</Button>
                      </DialogFooter>
                  </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/nouns.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(4)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">$nouns Transactions</DialogTitle>
                </DialogHeader>
                {!nounsUpdated && (
                          <div>
                              none
                          </div>
                      )}
                {nounsUpdated && (
                          <Badge variant="secondary" className="px-4 py-2 rounded-full">
                              Generated
                          </Badge>
                      )}
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/nouns.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">

                {!nounsUpdated && (
                    <p className="text-lg text-center text-muted-foreground">You are not transacting with $nouns yet.</p>
                )}
                {nounsUpdated && (
                    <>
                        <p>You hold $nouns</p>
                        <p className="text-2xl font-bold">{dataNouns?.is_nouns_holder} times</p>
                    </>
                )}    
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2" onClick={fetchNounsData}>Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/bored-ape.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(5)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">Am I an Ape?</DialogTitle>
                </DialogHeader>

                {!boredApeUpdated && (
                    <div>
                        none
                    </div>
                )}
                {boredApeUpdated && (
                    <Badge variant="secondary" className="px-4 py-2 rounded-full">
                        Generated
                    </Badge>
                )}
                
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/bored-ape.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">


                    {!nounsUpdated && (
                        <p className="text-lg text-center text-muted-foreground">You are not a verified Ape yet.</p>
                    )}
                    {nounsUpdated && (
                        <>
                            <p>You hold apes</p>
                            <p className="text-2xl font-bold">{dataBoredApe?.is_ape_holder} times</p>
                        </>
                    )}
                
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2" onClick={fetchBoredApesData}>Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/ape.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(6)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">ApeCoin Staking</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/ape.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You are not staking ApeCoin yet.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/talent.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(7)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">TalentProtocol BuildScore</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/talent.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">Your current Talent Protocol Builder score is 0.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/eth-global.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(8)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">ETH Global Hacker</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/eth-global.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You haven&apos;t sign with the ETH Global bracelet yet.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/sex.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(9)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">Gender</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/sex.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You haven&apos;t verify your gender yet
                    .</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/age.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(6)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">Birthday</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/age.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You haven&apos;t verify your birthday yet.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/farcaster.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(7)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">Farcaster</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/farcaster.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You haven&apos;t connect your Farcaster account yet.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/ens.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(8)}
              />
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center p-6 space-y-4 bg-white rounded-md shadow-lg">
                <DialogHeader className="flex items-center justify-between w-full">
                    <DialogTitle className="text-2xl font-bold">ENS</DialogTitle>
                </DialogHeader>
                <div>
                    none
                </div>
                <div className="flex items-center justify-center w-48 h-48 p-2 border rounded-md">
                    <img src="/ens.png" alt="Selected" className="w-full h-auto" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-lg text-center text-muted-foreground">You haven&apost;t verify your primary ENS domain yet.</p>
                </div>
                <DialogFooter className="w-full">
                    <Button className="w-full bg-orange-500 text-white rounded-lg py-2">Update</Button>
                </DialogFooter>
            </DialogContent>

          </Dialog>

      </div>
    </div>
  )
}