import { CommentBox } from "../../app/comps/CommentBox";
import { EmbedGithub } from "../../app/comps/EmbedGithub";
import { PostHeader } from "../../app/comps/PostHeader"
import { Post } from "../../app/posts"

const post: Post = {
    "id": 23,
    "title": "Spring Boot series: API server with JWT authentication",
    "publishDate": "2022-09-03T15:54:45Z",
    "tags": ["Java", "Spring Boot", "OAuth2", "API"]
};

export default function postPage() {
    return <div className="post">
        <PostHeader post={post} />

        <h1>Objective</h1>

        <p>
            To create a minimal microservice with some APIs that requires JWT authentication.
            The JWT will be issued by an external authorization server.
            The API server will verify that the validity of the JWT with the authorization server.
        </p>

        <p style={{ textAlign: 'center' }}>
            <img style={{ maxWidth: '100%' }} src="/assets/posts/23/diagram.drawio.svg" />
        </p>

        <p>
            We will only focus on the microservice part.
            I'm using <a href="https://www.keycloak.org/" target="_blank" rel="noreferrer">Keycloak</a> as the authorization server but you can use any authorization server.
        </p>

        <h1>Plan of attack</h1>

        <h2>1. Setup Keycloak</h2>

        <p>
            We will run Keycloak on Docker.
            Make sure you have installed Docker, then just run this command
            <code>
                docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:19.0.1 start-dev
            </code>
        </p>

        <p>
            This will run Keyclock on port 8080 with both admin user name and password set to `admin`.
            We will try to create a token with admin user to see if it's really up and running.
            Run this `curl` command:
            <code>
                curl http://localhost:8080/realms/master/protocol/openid-connect/token --header "content-type: application/x-www-form-urlencoded" --data grant_type=password --data client_id=admin-cli --data client_secret= --data username=admin --data password=admin
            </code>
        </p>

        <p>
            You should get the console output like this
            <code>
                {'{"access_token":"<base64_encoded_access_token>","expires_in":60,"refresh_expires_in":1800,"refresh_token":"<base64_encoded_refresh_token>","token_type":"Bearer","not-before-policy":0,"session_state":"<a_uuid>","scope":"profile email"}'}
            </code>
            The `access_token` is the JWT we will use for API call later.
        </p>

        <h2>2. Create a Spring Boot project</h2>

        <p>
            Use <a href="https://start.spring.io/" target="_blank" rel="noreferrer">Spring Initializr</a> to create a new project with this configuration
        </p>

        <ul>
            <li>Project: Gradle Project</li>
            <li>Language: Java</li>
            <li>Spring Boot: 2.7.3</li>
            <li>Java Version: 17 (You can use lower version)</li>
            <li>Dependencies:</li>
            <ol>
                <li>Spring Web - Allow us to create REST API</li>
            </ol>
        </ul>

        <p>
            This is a very minimal configuration for a microservice with API.
            It does not have any security capability yet. We will add that later.
            Now click on `Generate` to download the generated project in a ZIP file.
            Extract it somewhere and open it with your favourite IDE.
        </p>

        <p>
            The project comes with a default test to make sure the microservice can be started.
            Run the test with `gradlew test` command.
            It should build the project and run the test successfully.
        </p>

        <p>
            You can also try to start the microservice by `gradlew bootRun` command,
            however the default port is 8080 and it conflicts with the Keycloak port.
            We will need to change the microserovice port to 9000.
        </p>

        <p>
            Delete the file named `application.properties` in `src/main/resources`.
            That file is used to store application configuration in Java properties file format.
            We will use YAML format for better readibility.
        </p>

        <p>
            Create a file named `application.yaml` in `src/main/resources` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/resources/application.yml#L1-L2" />
        </p>

        <p>
            You can start the microservice now by `gradlew bootRun`.
        </p>

        <h2>3. Create a public API</h2>

        <p>
            Create a file named `PublicController.java` in `src/main/java/c4compile/jwtdemo` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/java/c4compile/jwtdemo/PublicController.java" />
        </p>

        <p>
            This will create a API on `/something` for GET operation that return a fixed string `Something!`.
            You can start the microservice with `gradlew bootRun` and test it with a `curl` command:
            <code>
                curl http://localhost
            </code>
        </p>

        <p>
            However, manual test is bad. We should do automated test.
            Create a file named `PublicControllerTest.java` in `src/test/java/c4compile/jwtdemo` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/test/java/c4compile/jwtdemo/PublicControllerTest.java" />
        </p>

        <p>
            This file contains only a single test.
            It will start the microservice on random port and perform a GET action on `/something`,
            then it validates the response status and response body.
            It's what we are doing manually just now, but now it's a automated test so we can run it whenever we want to make sure we do not break anything when adding new features.
        </p>

        <h2>4. Create an admin API</h2>

        <p>
            Now we will create an API that requires an JWT.
            We need to include another library from Spring to use the JWT authentication.
            Add this line to `build.gradle` file in the `dependencies` section:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/build.gradle#L16" />
        </p>

        <p>
            Run the test again with `gradlew test` command and the test should fail now with these messages:
            <code className="multiline">
                {`expected: <Something!> but was: <<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        ...`}
            </code>

            The `/something` API now return a login page instead of the expected string!
            By adding the new dependency, the security feature is turned on by default.
            Ignore this for now.
            We will fix this indirectly later.
        </p>

        <p>
            Create a file named `AdminController.java` in `src/main/java/c4compile/jwtdemo/admin` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/java/c4compile/jwtdemo/admin/AdminController.java" />
        </p>

        <p>
            This will create an API on `/admin/something` for GET operation that returns `Something from [username]!`.
        </p>

        <p>
            Create another file named `AdminSecurityConfig` in `src/main/java/c4compile/jwtdemo/admin` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/java/c4compile/jwtdemo/admin/AdminSecurityConfig.java" />
        </p>

        <p>
            This will configure the API to only allowed authenticated user to visit APIs under `/admin/**`.
            We need to access the authorization server in order to validate a JWT.
            We can tell Spring Boot where it is by adding these to the `application.yml` file:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/resources/application.yml#L4-L9" />
        </p>

        <p>
            You can start the microservice manually and try it but I will prefer to create an automated test here.
            Create a file named `TokenUtils.java` in `src/test/java/c4compile/jwtdemo/token` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/test/java/c4compile/jwtdemo/token/TokenUtils.java" />
        </p>

        <p>
            This file contains a utility method for the test to get a JWT from the authorization server.
            The JWT is short-lived so we need to get it everytime we run the test.
        </p>

        <p>
            Create a file named `AdminControllerTest.java` in `src/test/java/c4compile/jwtdemo/admin` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/test/java/c4compile/jwtdemo/admin/AdminControllerTest.java" />
        </p>

        <p>
            This will create 3 tests:
            <ol>
                <li>Perform an API call without JWT and we should get HTTP response status 401</li>
                <li>Perform an API call with a invalid JWT and we should get HTTP response status 403</li>
                <li>Perform an API call with a valid JWT and it should success</li>
            </ol>
            Run the tests with `gradlew test` and everything should success, even the test for public API!
            After we add the `SecurityFilterChain` bean, any route that is not matched in the chain will be accessible by everyone.
        </p>

        <p>
            Now we have a API at `/something` that allows everyone to access it and another API at `/admin/something` that only allowed authorized user to access it.
        </p>

        <h2>5. Create a super admin API</h2>

        <p>
            Now we will create a API that requires an JWT with specific role.
            We will not generate a JWT for that.
            This is just to show how we can have multiple `SecurityFilterChain` for different APIs.
            Create a file named `SuperAdminController.java` in `src/main/java/c4compile/jwtdemo/superadmin` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/java/c4compile/jwtdemo/superadmin/SuperAdminController.java" />
        </p>

        <p>
            It doesn't matter what the API is doing because we should not able to call it anyway.
            Create a file named `SuperAdminSecurityConfig` in `src/main/java/c4compile/jwtdemo/superadmin` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/main/java/c4compile/jwtdemo/superadmin/SuperAdminSecurityConfig.java" />
        </p>

        <p>
            Spring Boot does not allow multiple beans that has the same type and name.
            The name of the bean is actually the method name.
            So the method name has to be different from the method name in other class.
            This will configure the API to only allowed authenticated user with `SUPER_ADMIN` role to visit APIs under `/super-admin/**`.
        </p>

        <p>
            We will create another set of automated test to test it.
            Create a file named `SuperAdminControllerTest.java` in `src/test/java/c4compile/jwtdemo/superadmin` with these contents:
            <EmbedGithub target="https://github.com/chimin/blog-codes/blob/master/jwt-demo/src/test/java/c4compile/jwtdemo/superadmin/SuperAdminControllerTest.java" />
        </p>

        <p>
            This will create 2 tests:
            <ol>
                <li>Perform an API call without JWT and we should get HTTP response status 401</li>
                <li>Perform an API call with a valid JWT and we should get HTTP response status 403</li>
            </ol>
            Run the tests with `gradlew test` and everything should success.
        </p>

        <p>
            Now we have
            <ul>
                <li>a API at `/something` that allows everyone to access it</li>
                <li>a API at `/admin/something` that only allowed authorized user to access it</li>
                <li>a API at `/super-admin/something` that only allowed authorized user with `SUPER_ADMIN` role to access it</li>
            </ul>
            All the code are in respective modules.
            The full source code is <a href="https://github.com/chimin/blog-codes/tree/master/jwt-demo" target="_blank" rel="noreferrer">here</a>.
        </p>

        <CommentBox />
    </div >;
}