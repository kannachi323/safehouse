export default function Loading() {
    sleep(2000);
    return <div>Loading...</div>;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}