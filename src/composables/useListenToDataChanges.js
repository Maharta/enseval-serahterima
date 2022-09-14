import { onSnapshot, query } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

export function useListenToDataChanges(q) {
  const documentList = ref([]);
  const isLoading = ref(true);

  const collectionRef = query(q);
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      const convertedTimestamp = {
        tanggal: data.tanggal.toDate().toLocaleString(),
      };
      Object.assign(data, convertedTimestamp);
      if (change.type === "added") {
        documentList.value.push(data);
      }
      if (change.type === "modified") {
        documentList.value = documentList.value.filter(
          (doc) => doc.id !== data.id
        );
        documentList.value.push(data);
      }
      if (change.type === "removed") {
        documentList.value = documentList.value.filter(
          (doc) => doc.id !== data.id
        );
      }
    });
    isLoading.value = false;
  });
  onUnmounted(() => unsubscribe());

  return { documentList, isLoading };
}
