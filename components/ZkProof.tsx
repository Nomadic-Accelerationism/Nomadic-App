
"use client"

import { useState } from "react"
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";


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

export default function ZkProofComponent() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [patricioUpdated, setPatricioUpdated] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [dataPatricio, setDataPatricio] = useState<TokenResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { primaryWallet } = useDynamicContext();
  const endpoint = `http://159.223.228.122/poaps?wallet=${primaryWallet?.address}`;
  //console.log(endpoint);

  function updatePatricio() {
    fetchData();
  }

  async function fetchData() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            //throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: TokenResponse = await response.json();
        setDataPatricio(responseData);
        setPatricioUpdated(true);
        console.log(responseData);
    } catch (error) {
        console.log("error",error);
        setPatricioUpdated(false);
        //setError(error.message);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">My zkProofs</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 mb-2">

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/worldcoin.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(1)}
              />
            </DialogTrigger>
            <DialogContent>
              <img src="/worldcoin.png" alt="Selected" className="w-full h-auto" />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <img
                src="/polygon-id.png"
                alt="worldCoin"
                className="w-full h-auto rounded-lg cursor-pointer m-1"
                onClick={() => setSelectedImage(2)}
              />
            </DialogTrigger>
            <DialogContent>
              <img src="/polygon-id.png" alt="Selected" className="w-full h-auto" />
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
                        <p className="text-2xl font-bold">{ dataPatricio?.tokensCount } times</p>
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
            <DialogContent>
              <img src="/nouns.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/bored-ape.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/ape.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/talent.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/eth-global.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/sex.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/age.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/farcaster.png" alt="Selected" className="w-full h-auto" />
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
            <DialogContent>
              <img src="/ens.png" alt="Selected" className="w-full h-auto" />
            </DialogContent>
          </Dialog>


      </div>
    </div>
  )
}