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
              <Card key={element._id} className="h-fit p-5 sm:p-7 flex flex-col justify-center items-center gap-3 bg-linear-to-tr from-black to-primary/15 border-primary/30 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/60 transition-all duration-300 group cursor-pointer">
                <Card className="relative overflow-hidden rounded-lg bg-primary/15 p-3 group-hover:from-purple-900/20 group-hover:to-cyan-900/20 transition-colors border-none">
                  <img
                    src={element.image && element.image.url}
                    alt="software"
                    className="h-12 sm:h-20 w-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </Card>
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