import { EmbedGithub } from "../../app/comps/EmbedGithub";
import { PostHeader } from "../../app/comps/PostHeader"
import { Post } from "../../app/posts"

const post: Post = {
    "id": 23,
    "title": "Test",
    "publishDate": "",
    "tags": ["tag1", "tag2"]
};

export default function postPage() {
    return <>
        <PostHeader post={post} />

        <h1>header</h1>

        <p>body</p>

        <EmbedGithub target="https://github.com/chimin/blog/blob/main/firebase.json" />
    </>;
}