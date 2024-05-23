import { useState } from "react";

interface Metadata {
    name: string;
    image: string;
    description: string;
    [key: string]: unknown; // 다른 속성들을 포함하기 위해
  }
  
  interface NFTDisplayProps {
    metadataUrl: string;
  }
  
  export const NFTDisplay: React.FC<NFTDisplayProps> = ({ metadataUrl }) => {
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchMetadata = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(metadataUrl);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data: Metadata = await response.json();
        setMetadata(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <button onClick={fetchMetadata}>Load NFT Metadata</button>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {metadata && (
          <div>
            <table border={1}>
              <thead></thead>
              <tbody>
                <tr>
                  <td>name</td>
                  <td>image</td>
                  <td>description</td>
                </tr>
                <tr>
                  <td>{metadata.name}</td>
                  <td>
                    {" "}
                    <img src={metadata.image} alt={metadata.name} />
                  </td>
                  <td>
                    {" "}
                    <p>{metadata.description}</p>
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        )}
      </div>
    );
  };
  