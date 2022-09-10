import { Timestamp } from "firebase/firestore";
import { auth } from "../firebase/config";

const roleTranslator = () => {
  const owner = auth.currentUser.uid;
  return {
    owner: owner,
    ekspedisi: "RWyBwDwiVtWa9s6FPfszzNFcDth2", // ekspedisi account UID, only this role can see all items.
  };
};

class Dokumen {
  constructor({ id, nilai, tanggal = Timestamp.now(), ket }) {
    this.id = id;
    this.nilai = nilai;
    this.tanggal = tanggal;
    this.keterangan = ket;
    this.roles = roleTranslator();
  }
}

const DokumenConverter = {
  toFireStore: (dokumen) => {
    console.log(auth.currentUser.uid);
    return {
      id: dokumen.id,
      nilai: dokumen.nilai,
      tanggal: dokumen.tanggal,
      keterangan: dokumen.keterangan,
      roles: dokumen.roles,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Dokumen(data.id, data.nilai, data.tanggal, data.keterangan);
  },
};

export { Dokumen, DokumenConverter };
