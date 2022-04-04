import { useRouter } from "next/router";

export const RecommendTags = ({ tags }) => {
    const router = useRouter();
    const hanldeClick = (tag: { key: string }) => {
        router.push(`/search?key=${tag.key}`);
    };
    return (
        <div className="flex gap-4 flex-wrap justify-center">
            {tags.map((tag: { key: string }, idx: number) => (
                <button
                    onClick={() => hanldeClick(tag)}
                    key={idx}
                    className="px-6 py-4 shadow-sm border bg-white 
                    rounded-lg text-xl flex justify-center items-center 
                    hover:border-red-300 hover:text-red-500 transition duration-150 ease-in-out"
                >
                    {tag.key}
                </button>
            ))}
        </div>
    );
};
