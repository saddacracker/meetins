// apps/api/src/app/set.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

export interface SetEntity {
  id: number;
  name: string;
  day: number;
  slug: string;
  time: string;
  end_time: string;
  group: string;
  updated: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

@Resolver('Set')
export class SetResolver {
  private sets: SetEntity[] = [
    {
      id: 1,
      name: "A Vision For You",
      day: 4,
      slug: "a-vision-for-you",
      time: "19:00",
      end_time: "20:00",
      group: "A Vision For You",
      updated: "2014-05-31 14:32:23",
      address: "69 Fake Address Street",
      city: "Everett",
      state: "WA",
      postal_code: "98201",
      country: "US"
    },
    {
      id: 1,
      name: "New Life",
      day: 3,
      slug: "new-life-group",
      time: "19:00",
      end_time: "20:30",
      group: "New Life",
      updated: "2014-05-31 14:32:23",
      address: "69 Fake Address Street",
      city: "Everett",
      state: "WA",
      postal_code: "98201",
      country: "US"
    }
  ];

  @Query('allSets')
  getAllSets(): SetEntity[] {
    return this.sets;
  }

  @Mutation()
  addSet(
    @Args('name') name: string,
    @Args('day') day: number,
    @Args('slug') slug: string,
    @Args('time') time: string,
    @Args('end_time') end_time: string,
    @Args('group') group: string,
    @Args('updated') updated: string,
    @Args('address') address: string,
    @Args('city') city: string,
    @Args('state') state: string,
    @Args('postal_code') postal_code: string,
    @Args('country') country: string
  ) {
    const newSet = {
      id: this.sets.length + 1,
      name,
      day,
      slug,
      time,
      end_time,
      group,
      updated,
      address,
      city,
      state,
      postal_code,
      country,
    };

    this.sets.push(newSet);

    return newSet;
  }
}