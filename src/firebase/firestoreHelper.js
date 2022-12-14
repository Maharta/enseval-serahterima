import {
  collection,
  deleteDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

const EKPEDISI_ID = "RWyBwDwiVtWa9s6FPfszzNFcDth2";

const isEkspedisi = (id) => {
  if (id === EKPEDISI_ID) return true;
  return false;
};

const OwnerTranslator = {
  qKISUN5y6vfuq7W8XQDhLX71Qzk2: "farma",
  RWyBwDwiVtWa9s6FPfszzNFcDth2: "ekspedisi",
  gdRshc7LoBhEVG2Z7XqMCQCWYxB3: "CHB",
  LDKZ83v5UqOlUT37xn6ZA74B5eB2: "KND",
  PKOVeJsrx6h0a8PMKjrlXTv598c2: "CHD",
};

class Document {
  constructor({ id, nilai, tanggal = Timestamp.now(), ket, owner }) {
    this.id = id;
    this.nilai = nilai;
    this.tanggal = tanggal;
    this.keterangan = ket;
    this.owner = owner;
    this.status = "pending";
  }
}

const DocumentConverter = {
  toFireStore: (document) => {
    return {
      id: document.id,
      nilai: document.nilai,
      tanggal: document.tanggal,
      keterangan: document.keterangan,
      owner: document.owner,
      status: document.status,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Document(
      data.id,
      data.nilai,
      data.tanggal,
      data.keterangan,
      data.owner
    );
  },
};

const editDocument = async (id, collectionName, order) => {
  const q = query(collection(db, collectionName), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    try {
      updateDoc(doc.ref, {
        id: order.id,
        nilai: order.nilai,
        keterangan: order.keterangan,
      });
    } catch (error) {
      alert(error);
    }
  });
};

const deleteDocument = async (id, collectionName) => {
  const q = query(collection(db, collectionName), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

export {
  Document,
  DocumentConverter,
  EKPEDISI_ID,
  OwnerTranslator,
  isEkspedisi,
  deleteDocument,
  editDocument,
};
