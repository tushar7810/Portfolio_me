import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/api/v1/software/all`,
        { withCredentials: true }
      );
      setApps(data.softwares);
    };
    getMyApps();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        Softwares
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps &&
          apps.map((element) => {
            return (
              <Card key={element._id} className="h-fit p-5 sm:p-7 flex flex-col justify-center items-center gap-3 bg-slate-900/50 border-slate-700 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-3 group-hover:from-purple-900/20 group-hover:to-cyan-900/20 transition-colors">
                  <img
                    src={element.image && element.image.url}
                    alt="software"
                    className="h-12 sm:h-20 w-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-muted-foreground text-center text-sm sm:text-base font-medium group-hover:text-purple-300 transition-colors">
                  {element.name}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;