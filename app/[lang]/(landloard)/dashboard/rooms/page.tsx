'use client';
import LinkText from "@/components/common/LinkText";
import LoadingSection from "@/components/common/LoadingSection";
import { showToast } from "@/components/common/Toast";
import useAppStore from "@/stores/appStore"
import { Room } from "@/types/room";
import { fetchData } from "@/utils/http";
import { useEffect, useState } from "react";

export default function Rooms() {
  const {t} = useAppStore();

  const [allRooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async() => {
    setLoading(true);
    const {rooms, err} = await fetchData({url:'/api/rooms'});
    setLoading(false);
    if (err) {
      showToast(err);
    } else {
      setRooms(rooms);
    }
  }

  useEffect(()=>{
    fetchRooms();
  },[]);

  return (
    <>
      <h1 className="page-title">{t('home.Rooms')}</h1>
      <LoadingSection loading={loading}>
        <section className="card-container">
        {allRooms.map((room)=>
          <article key={room._id} className={`card ${room.tenant ? '': 'border-green-500 border'}`}>
            <LinkText text={room.name || ''} href={`/dashboard/rooms/${room._id}`} />
            <p>{t('home.Property')}: {room.property?.name || ''}</p>
            <p>{room.tenant?.name}</p>
          </article>
        )}
        </section>
      </LoadingSection>
    </>
  )
}