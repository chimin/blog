import Link from "next/link";
import { useMemo } from "react";

interface PropsType {
    tags: string[];
}

export function PostTags(props: PropsType) {
    const tags = useMemo(() => {
        const list = [];
        if (props.tags) {
            for (var i = 0; i < props.tags.length; i++) {
                if (i) list.push(', ');
                list.push(<Link key={props.tags[i]} href={`/tags/${props.tags[i]}`}>{props.tags[i]}</Link>);
            }
        }
        return list;
    }, [props.tags]);

    return <>{tags}</>;
}