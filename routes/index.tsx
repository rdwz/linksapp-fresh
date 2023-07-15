import { Handlers, PageProps } from "$fresh/server.ts";
import jsonProfile from "../profile.json" assert { type: "json" };
import type Profile from "../profile.type.ts";

import Avatar from "../components/Avatar.tsx";
import Username from "../components/Username.tsx";
import Bio from "../components/Bio.tsx";
import Location from "../components/Location.tsx";
import SocialLinks from "../components/SocialLinks.tsx";
import Banner from "../components/Banner.tsx";
import Tabs from "../islands/Tabs.tsx";
import ProfileMisconfig from "../components/ProfileMisconfig.tsx";
import ReadmeButton from "../components/ReadmeButton.tsx";

import fetchFeed from "../utils/rss.ts";

type HandlerProps = {
  feed:
    | {
        title: string;
        date: Date;
        url: string;
      }[]
    | undefined;
  githubProfile: any;
};

export const handler: Handlers<HandlerProps | null> = {
  async GET(_, ctx) {
    const profile: Profile = jsonProfile;
    const { rss } = profile;

    let feed = undefined;
    if (rss) feed = await fetchFeed(rss);
    const res = await fetch("https://api.github.com/users/rdwz");
    const jsonData = await res.json();

    return ctx.render({
      feed,
      githubProfile: jsonData,
    });
  },
};

export default function Home({ data }: PageProps<HandlerProps | null>) {
  if (!data) return <h1>Profile misconfiguration.</h1>;

  const profile: Profile = jsonProfile;
  const {
    avatar,
    username,
    bio,
    location,
    socialAccounts,
    banner,
    links,
    readme,
  } = profile;
  const { feed,githubProfile } = data;

  // validate profile configuration
  if (!avatar) {
    return (
      <ProfileMisconfig>
        Property <i>avatar</i> can't be empty.
      </ProfileMisconfig>
    );
  }
  if (!username) {
    return (
      <ProfileMisconfig>
        Property <i>username</i> can't be empty.
      </ProfileMisconfig>
    );
  }
  if (!bio) {
    return (
      <ProfileMisconfig>
        Property <i>bio</i> can't be empty.
      </ProfileMisconfig>
    );
  }
  if (links.length === 0) {
    return (
      <ProfileMisconfig>
        Property <i>links</i> can't be of length zero.
      </ProfileMisconfig>
    );
  }

  return (
    <main class="w-10/12 sm:w-96 mx-auto">
      <div class="flex flex-col w-full mt-12 mb-28">
        <div class="flex flex-col items-center w-full w-full rounded-xl p-4">
          <Avatar avatar={githubProfile.avatar_url} />
          <Username username={githubProfile.login} />
          <Bio bio={githubProfile.bio} />
          {location && <Location location={githubProfile.location} />}
          {readme && <ReadmeButton />}
          <div class="mb-4"></div>
          <SocialLinks socialAccounts={socialAccounts} />
          {banner && (
            <Banner title={banner.title} text={banner.text} />
          )}
          <Tabs links={links} feed={feed} />
        </div>
      </div>
    </main>
  );
}
