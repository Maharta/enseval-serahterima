import { ref } from "vue";
import { OwnerTranslator } from "../firebase/firestoreHelper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export function useFirestore(user) {
  const documentList = ref([]);
  const error = ref(null);

  if (user) {
    const collectionName = OwnerTranslator[`${user.uid}`];
    const collectionRef = collection(db, collectionName);
    getDocs(collectionRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const convertedTimestamp = {
            tanggal: data.tanggal.toDate().toLocaleString(),
          };
          Object.assign(data, convertedTimestamp);
          documentList.value.push(data);
        });
      })
      .catch((err) => (error.value = err));
  }

  return {
    documentList,
    error,
  };
}
