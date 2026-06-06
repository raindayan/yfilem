import InfiniteScrollList from "../components/list";

export default function ComponentTest() {

    interface File {
        id: number;
        name: string;
        size: number;
        date: Date;
        url: string;
        type: 'image' | 'video' | 'word' | 'pdf' | 'excel'
    }

    const loadData = async (page: number) => {
        return new Promise<File[]>((resolve) => {
            fetch('http://localhost:3000')
        });
    };

    const renderItem = (item: File) => {
        return <div key={item.id}>{item.name}</div>;
    }


    return (
        <InfiniteScrollList loadData={loadData} renderItem={renderItem}></InfiniteScrollList>
    )
}