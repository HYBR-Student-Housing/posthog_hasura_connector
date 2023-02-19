import { GraphQLClient } from 'graphql-request'
import { gql } from 'graphql-tag'

export function processEvent(event, meta) {
    const endpoint = meta.config.hasura_url
    const apiSecret = meta.config.hasura_secret
    const client = new GraphQLClient(endpoint, { headers: { 'x-hasura-admin-secret': apiSecret } })

    const mutation = gql`
      mutation insertEvent($object: posthog_event_insert_input = {}) {
        insert_posthog_event_one(object: $object) {
          id
        }
      }`

    // Some events (like $identify) don't have properties
    if (event.properties) {
        console.log(event)
    }
    // Return the event to ingest, return nothing to discard
    return event
}
