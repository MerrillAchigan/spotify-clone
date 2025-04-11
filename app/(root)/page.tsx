import Image from "next/image";
import {Plus, ArrowRight, Library, Search, List} from 'lucide-react'
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="menu-aside">
        <div className="flex-between">
          <div className="flex gap-2">
            <Library className="size-5"/>
            <p className="text-white text-30-semibold">Your Library</p>
          </div>
          <div className="flex justify-end gap-2">
            <button className="icon-button text-white">
              <Plus className="size-5" />
            </button>
            <button className="icon-button text-white">
              <ArrowRight className="size-5"/>
            </button>
          </div>
        </div>
        <div className="flex-between gap-2 mt-3">
          <button className="button">
            Playlist
          </button>
          <button className="button">
            Albums
          </button>
          <button className="button">
            Artists 
          </button>
        </div>
        <div className="mt-4 flex-between">
          <div >
            <button className="">
              <Search className="size-5"/>
            </button>
          </div>
          <div className="flex gap-2">
            <p>Recents</p>
            <button className="">
              <List className="size-5"/>
            </button>
          </div>
        </div>
      </section>
      <section className="principal">
          <Image src='' className="" alt='banner' />
          <div>
            <button></button>
          </div>
      </section>
    </>
  );
}
