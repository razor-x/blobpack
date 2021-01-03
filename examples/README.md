# Examples

<!--- TODO: Update all uses of todo with added example. -->

## Running Examples Locally

### Local configuration

Set required and optional configuration options in `examples/local.json`, e.g.,

```json
{
  "logLevel": "info",
  "logFilter": null,
  "logOutputMode": "short"
}
```

Override any option with the corresponding environment variable:

- `LOG_LEVEL` (optional)
- `LOG_FILTER` (optional)
- `LOG_OUTPUT_MODE` (optional)

### Running examples with arguments

List all runnable examples with

```
$ yarn run example
```

Run provided examples with, e.g.,

```
$ yarn run example todo
```

Pass arguments to examples with

```
$ yarn run example todo false
```

#### Debugging examples

Debug examples with, e.g.,

```
$ yarn run example:inspect todo
```

For examples which run a single process and then exit,
create a breakpoint by adding the statement `debugger`
to the top of the example function, e.g.,

```js
export default ({log}) => async () => {
  debugger
  // ...
}
```

## Writing New Examples

1. Create a new file in `examples` or add an example to an existing file.
   Any new dependencies which are only used
   in examples should be installed as devDependencies.
   The return value of the function will be logged as `data`.
   All exported functions can take options and arguments with defaults, e.g.,
   ```js
   /* examples/query-api.js */
   import got from 'got'

   export default ({
     log,
     fooApi = 'https://example.com'
   }) => async (id = 'foo', page = 1) => {
     const query = { page: parseInt(page) }
     log.debug({ query, id })
     return got(`${fooApi}/search/${id}`, { query })
   }
   ```
2. Import and add the example to `examples/index.js`, e.g.,
   ```js
   /* examples/index.js */
   import queryApi from './query-api.js'

   export const examples = {
     queryApi,
     // ...
   }
   ```
3. Add any new options to this README and in `examples/index.js`, e.g.,
   ```js
   /* examples/index.js */
   const envVars = [
     'FOO_API',
     // ...
   ]
   ```
   ````
   /* examples/README.md */
   ### Local configuration

   Set required and optional configuration options in `examples/local.json`, e.g.,

   ```json
   {
     "queryApi": "https://example.com",
     ...
   }
   ```

   Override any option with the corresponding environment variable:

   - QUERY_API
   - ...
   ````

## Adding Log Filters

1. Create a new file in `examples` which exports filters, e.g.,
   ```js
   /* examples/filters.js */
   // Only print logs with a foo property equal to bar.
   const onlyFooBar = log => log.foo === 'bar'

   export default {
     onlyFooBar
   }
   ```
2. Import and add filters to `examples/index.js`, e.g.,
   ```js
   /* examples/index.js */
   import filters from './filters.js'

   const { runExample } = createExamples({
     filters,
     ...
   })
   ```
3. Apply the filter by setting `LOG_FILTER` or `logFilter`,
   e.g., `LOG_FILTER=onlyFooBar`.
