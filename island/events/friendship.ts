/*
 * @Description: The friendship event alerts you when someone sends you a friend request.
 */

import { Friendship, types as PuppetTypes } from 'wechaty'
import { useBotConfig } from '@/store'

export const useFriendship = async (friendship: Friendship) => {
  const [config] = useBotConfig()

  const friendshipType = friendship.type()

  switch (friendshipType) {
    /* New Friend Request */
    case PuppetTypes.Friendship.Receive:
      {
        const hello = friendship.hello()

        if (config.wechaty.acceptFriendship.includes(hello)) {
          await friendship.accept()
        }
      }
      break

    /* Friend Ship Confirmed */
    case PuppetTypes.Friendship.Confirm:
      {
        const contact = friendship.contact()

        await new Promise((r) => setTimeout(r, 1000))
        await contact.say(config.wechaty.receptionFriendship)
      }
      break

    /* This is for when we send a message to others, but they did not accept us as a friend. */
    case PuppetTypes.Friendship.Verify:
      break

    /* FriendshipType unknown */
    default:
      throw new Error('FriendshipType unknown: ' + friendshipType)
  }
}
