import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "utils/fetcher";

import PieceData from './pieces.json';


type Props = {
  details: any;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onSelect,
  onTokenDetailsFetched = () => {},
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { updateAuthority, mint } = details ?? {};
  const { name, uri } = details?.data ?? {};

  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // console.log("data", data);

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image, description } = data ?? {};

   function getPieceDetails(mint: any){
      let piece = PieceData.find((piece: any) => piece.id === mint); 
      var details = "";
      if(piece?.artist){
        details += "Artist: ";
        if (piece?.artisttwitter) details += "<a href='https://www.twitter.com/" + piece?.artisttwitter + "' target='_blank'>";
        details += piece?.artist;
        if (piece?.artisttwitter) details += "</a>";
      } 
      if(piece?.collection){
        details += "<br />Collection: ";
        if (piece?.collectionurl) details += "<a href='" + piece?.collectionurl + "' target='_blank'>";
        details += piece?.collection;
        if (piece?.collectionurl) details += "</a>";
      }
      if(piece?.acqdate){
        details += "<br />Acquired: ";
        details += piece?.acqdate;
      }
      if(piece?.acqprice){
        details += "<br />Cost: ";
        details += piece?.acqprice;
      }
      return details;
  }

  function getImageThumb(mint: any){
    let piece = PieceData.find((piece: any) => piece.id === mint); 
    if (piece?.thumb) return "gallerythumbs/" + piece?.thumb
    return image
  }

  if(!image || name === 'EXCHANGE NOTIFICATION NFT' || name === 'Realms #19 x Atoll'){
    return ( null );
  } else {
    return (
      <div className={`max-w-xs compact`}>
        <figure className="min-h-16 animation-pulse-color">
          {!fallbackImage || !error ? (
            <a href={"/single/" + mint}>
              <div className="hover-zoom-wrapper">
                <img
                  src={ getImageThumb(mint) }
                  onError={onImageError}
                  className="bg-gray-800 object-cover hover-zoom"
                />
              </div>
            </a>
          ) : (
            // Fallback when preview isn't available
            // This could be broken image, video, or audio
            <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
              <EyeOffIcon className="h-16 w-16 text-white-500" />
            </div>
          )}
        </figure>
        <div className="piece-body">
          <h2 className="text-center font-bold">{name}</h2>
          <div className="text-center" dangerouslySetInnerHTML={{ __html: getPieceDetails(mint) }} />
        </div>
      </div>
    );
  }
};
