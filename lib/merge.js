export const mergeConfig = (accumulator, currentValue) => ({
  ...accumulator,
  ...currentValue,
  input_resources: [
    ...(accumulator?.input_resources ?? []),
    ...(currentValue?.input_resources ?? [])
  ],
  cache_resources: [
    ...(accumulator?.cache_resources ?? []),
    ...(currentValue?.cache_resources ?? [])
  ],
  rate_limit_resources: [
    ...(accumulator?.rate_limit_resources ?? []),
    ...(currentValue?.rate_limit_resources ?? [])
  ],
  processor_resources: [
    ...(accumulator?.processor_resources ?? []),
    ...(currentValue?.processor_resources ?? [])
  ],
  output_resources: [
    ...(accumulator?.output_resources ?? []),
    ...(currentValue?.output_resources ?? [])
  ]
})
