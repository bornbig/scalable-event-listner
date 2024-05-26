'use client'
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios"
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshActivity = async () => {
    setLoading(true)
    const data = (await axios.get("/api/v1/nft/activity")).data;
    setList(data.list);
    setLoading(false)
  }

  useEffect(() => {
    const interval = setInterval(refreshActivity, 5000);
    console.log("here")
    return () => {
      clearInterval(interval);
    };
  }, [])

  return (
    <main className="l">
      <div className="grid grid-cols-6 gap-4">
        <div></div>
        <div className="col-span-5">
          <div className="w640px">
            {loading && <div className="loading"><img src="/loading.gif"/></div>}
            <div className="grid grid-cols-10 gap-2 tab">
                <div></div>
                <div>
                </div>
                <div className="col-span-4">
                  <div className="name">NAME</div>
                </div>
                <div className="addr col-span-2">FROM</div>
                <div  className="addr col-span-2">TO</div>
              </div>
            {list.map((activity, index) => (
              <div className="grid grid-cols-10 gap-2 tab">
                <div>{parseFloat(activity.tokenId / (10 ** 6)).toFixed(1)}</div>
                <div>
                  <img src="https://coinhere.io/wp-content/uploads/2020/08/Tether-USDT-icon-1.png" />
                </div>
                <div className="col-span-4">
                  <div className="name">USDT</div>
                  <div className="ticker">Tether</div>
                </div>
                <div className="addr col-span-2">{activity.fromAddress.substr(0, 6)}</div>
                <div  className="addr col-span-2">{activity.toAddress.substr(0, 6)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
