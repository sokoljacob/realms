import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
const walletPublicKey = "ATh5Q48kxcqYTsL9XJmxSMUKyGfN8gaq4J5DCKpz8EWF";

export const CommunityGallery: FC = ({}) => {
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  });


  console.log("nfts", nfts);

  return (
    <div className="container mx-auto 2xl:px-0">
        <div className="hero min-h-16 p-0">
          <div className="text-center hero-content w-full">
            <div className="w-full">
              <h1 className="mb-5 text-3xl font-bold">
                COMMUNITY GALLERY
              </h1>
              <div className="my-10">
                {error ? (
                  <div>
                    <h1>Error Occured</h1>
                    {(error as any)?.message}
                  </div>
                ) : null}

                {!error && isLoading ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  <NftList nfts={nfts} error={error} />
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};
