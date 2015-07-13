## Commands

| Command          | Description |
|------------------|-------------|
| `npm start`      | Run the TiddlyWiki as a server at `http://localhost:8080/`. |
| `npm run build`  | Build the main wiki as a single index.html and static files. |
| `npm run clean`  | Clean any build files. |
<% if (deployCommand) {
%>| `npm run deploy` | Deploy to a server via <%= deployChoice %>. |<%
} %>
