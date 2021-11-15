import { Player } from '../../../src/entities/player';
import { connection } from '../../../@jest/setup';

type GetPlayer = (_: { id: string }) => Promise<Player | undefined>;
export const getPlayer: GetPlayer = async ({ id }) =>
  connection
    .getRepository(Player)
    .createQueryBuilder('player')
    .where('player.id = :id', { id })
    .getOne();
