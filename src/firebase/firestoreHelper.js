import { Timestamp } from "firebase/firestore";
import { auth } from "../firebase/config";

const EKPEDISI_ID = "RWyBwDwiVtWa9s6FPfszzNFcDth2";

const OwnerTranslator = {
  qKISUN5y6vfuq7W8XQDhLX71Qzk2: "farma",
  RWyBwDwiVtWa9s6FPfszzNFcDth2: "ekspedisi",
};

class Document {
  constructor({ id, nilai, tanggal = Timestamp.now(), ket }) {
    this.id = id;
    this.nilai = nilai;
    this.tanggal = tanggal;
    this.keterangan = ket;
  }
}

const DocumentConverter = {
  toFireStore: (document) => {
    console.log(auth.currentUser.uid);
    return {
      id: document.id,
      nilai: document.nilai,
      tanggal: document.tanggal,
      keterangan: document.keterangan,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Document(data.id, data.nilai, data.tanggal, data.keterangan);
  },
};

export { Document, DocumentConverter, EKPEDISI_ID, OwnerTranslator };
