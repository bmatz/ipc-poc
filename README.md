### Main

-   Einstieg: `src/app/main.js:55`, aufruf von `createIPCHandlers()` on app start
-   Erzeugt listeners: `src/app/create-ipc-handlers.js`, jede schnittstelle (handler) ist ein eigenes topic, antwortet jeweils mit topic.ok bzw topic.error, dynamicHandler() sorgt hier für dependency Injection von dbSchemas bzw. generell db(mongoose api) welche von den handlern benutzt wird
-   aus z.B.: `src/app/events/topic-events.js`, hier liegt die eigentliche BL der jeweiligen topics

### Renderer

-   Erzeugt ipc calls `src/client/domain/ipc-event-handlers.js`
-   mithilfe von `src/client/domain/create-ipc-event-handlers.js`, erzeugt adhoc pro topic response listeners für ok und error, calls send, alles verpackt in einer promise
