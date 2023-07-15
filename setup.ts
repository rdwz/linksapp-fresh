try {
  const dirStat = Deno.statSync("./linksapp-fresh/");
  if (dirStat.isDirectory) {
    console.log(red("💥 Directory ./linksapp-fresh/ already exists."));
    Deno.exit(1);
  }
} catch {
  console.error()
}

import {
  Checkbox,
  Confirm,
  Input,
  prompt,
} from "https://deno.land/x/cliffy@v0.25.4/prompt/mod.ts";

import { red, yellow, bold } from "https://deno.land/std@0.161.0/fmt/colors.ts";

console.log(yellow("Linksapp Setup Wizard 🪄"));
console.log(
  "Fork the repo -> https://github.com/commune-org/linksapp-fresh/fork",
);

const repo: string = await Input.prompt({
  message: "Forked .git HTTPS URL:",
  minLength: 7,
});

const repoDir = repo.split("/").pop()?.replace(".git", "");

const cloneCmd = Deno.run({
  cmd: [
    "git",
    "clone",
    repo,
  ],
});

const cloneStatus = await cloneCmd.status();

if (!cloneStatus.success) {
  console.log(red("💥 Git clone failed. Make sure to provide correct URL."));
  Deno.exit(1);
}

import {
  validateBio,
  validateDomain,
  validateFeed,
  validateHttps,
  validateHttpsImage,
  validateHttpsMarkdown,
  validateLocation,
  validateMail,
  validateUsername,
} from "./utils/validator.ts";

import type Profile from "https://raw.githubusercontent.com/rdwz/linksapp-fresh/main/profile.type.ts";

const promoptResult = await prompt([{
  name: "username",
  message: "Username (required):", // required
  type: Input,
  minLength: 1,
  maxLength: 50,
  after: async ({ username }, next) => {
    validateUsername(username);
    await next();
  },
}, {
  name: "avatar",
  message: "Avatar URL (required):", // required
  type: Input,
  minLength: 7,
  after: async ({ avatar }, next) => {
    validateHttpsImage(avatar);
    await next();
  },
}, {
  name: "bio",
  message: "Bio (required):", // required
  type: Input,
  minLength: 1,
  maxLength: 128,
  after: async ({ bio }, next) => {
    validateBio(bio);
    await next();
  },
}, {
  name: "location",
  message: "Location (optional):",
  type: Input,
  maxLength: 128,
  after: async ({ location }, next) => {
    validateLocation(location);
    await next();
  },
}, {
  name: "readme",
  message: "README.md (optional):",
  type: Input,
  after: async ({ readme }, next) => {
    validateHttpsMarkdown(readme);
    await next();
  },
}, {
  name: "rss",
  message: "RSS feed (optional):",
  type: Input,
  after: async ({ rss }, next) => {
    validateFeed(rss);
    await next();
  },
}, {
  name: "socialAccounts",
  message: "Select social accounts (space bar):",
  type: Checkbox,
  options: [
    "Dribbble",
    "Facebook",
    "GitHub",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "YouTube",
    "Website",
    "Mail",
  ],
}, {
  name: "dribbble",
  message: "Enter Dribbble URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Dribbble")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ dribbble }, next) => {
    validateDomain(dribbble, "dribbble.com");
    await next();
  },
}, {
  name: "facebook",
  message: "Enter Facebook URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Facebook")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ facebook }, next) => {
    validateDomain(facebook, "facebook.com");
    await next();
  },
}, {
  name: "github",
  message: "Enter GitHub URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("GitHub")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ github }, next) => {
    validateDomain(github, "github.com");
    await next();
  },
}, {
  name: "instagram",
  message: "Enter Instagram URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Instagram")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ instagram }, next) => {
    validateDomain(instagram, "instagram.com");
    await next();
  },
}, {
  name: "linkedin",
  message: "Enter LinkedIn URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("LinkedIn")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ linkedin }, next) => {
    validateDomain(linkedin, "linkedin.com");
    await next();
  },
}, {
  name: "twitter",
  message: "Enter Twitter URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Twitter")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ twitter }, next) => {
    validateDomain(twitter, "twitter.com");
    await next();
  },
}, {
  name: "youtube",
  message: "Enter YouTube URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("YouTube")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ youtube }, next) => {
    validateDomain(youtube, "youtube.com");
    await next();
  },
}, {
  name: "website",
  message: "Enter website URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Website")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ website }, next) => {
    validateHttps(website);
    await next();
  },
}, {
  name: "mail",
  message: "Enter email address:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Mail")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ mail }, next) => {
    validateMail(mail);
    await next();
  },
}, {
  name: "isBanner",
  message: "Do you want to display a banner?",
  type: Confirm,
  after: async ({ isBanner }, next) => {
    if (isBanner) await next("bannerTitle");
  },
}, {
  name: "bannerTitle",
  message: "Banner title (required):",
  type: Input,
  minLength: 1,
  maxLength: 128,
  before: async ({ isBanner }, next) => {
    if (isBanner) {
      await next();
    } else {
      await next(true); // skip
    }
  },
}, {
  name: "bannerMessage",
  message: "Banner message (required):",
  type: Input,
  minLength: 1,
  maxLength: 128,
  before: async ({ isBanner }, next) => {
    if (isBanner) {
      await next();
    } else {
      await next(true); // skip
    }
  },
}]);

const {
  avatar,
  username,
  bio,
  location,
  rss,
  readme,
  dribbble,
  facebook,
  github,
  instagram,
  linkedin,
  twitter,
  youtube,
  website,
  mail,
  isBanner,
  bannerTitle,
  bannerMessage,
} = promoptResult;

const profile: Profile = {
  $schema:
    "https://raw.githubusercontent.com/rdwz/linksapp-fresh/main/profile.schema.json",
  avatar: avatar!,
  username: username!,
  bio: bio!,
  links: [],
  socialAccounts: {},
};

if (location) profile["location"] = location;
if (rss) profile["rss"] = rss;
if (readme) profile["readme"] = readme;
if (dribbble) profile.socialAccounts["dribbble"] = dribbble;
if (facebook) profile.socialAccounts["facebook"] = facebook;
if (github) profile.socialAccounts["github"] = github;
if (instagram) profile.socialAccounts["instagram"] = instagram;
if (linkedin) profile.socialAccounts["linkedin"] = linkedin;
if (twitter) profile.socialAccounts["twitter"] = twitter;
if (youtube) profile.socialAccounts["youtube"] = youtube;
if (website) profile.socialAccounts["website"] = website;
if (mail) profile.socialAccounts["mail"] = mail;
if (isBanner) profile["banner"] = { title: bannerTitle!, text: bannerMessage! };

let addLinks = true;

while (addLinks) {
  console.log("Adding a link 🔗");
  const link = await prompt([{
    name: "title",
    type: Input,
    message: "Link title:",
    minLength: 1,
    maxLength: 50,
  }, {
    name: "url",
    type: Input,
    message: "Link URL:",
    minLength: 7,
    after: async ({ url }, next) => {
      validateHttps(url);
      await next();
    },
  }]);
  profile.links.push({ url: link.url!, title: link.title! });

  addLinks = await Confirm.prompt("Add another link?");
}

try {
  Deno.writeTextFileSync(
    `./${repoDir}/profile.json`,
    JSON.stringify(profile),
  );
} catch (e) {
  console.log(red(e));
  Deno.exit(1);
}

const gitAddCmd = Deno.run({
  cmd: [
    "git",
    "add",
    ".",
  ],
  cwd: `./${repoDir}`,
});

const gitAddStatus = await gitAddCmd.status();

if (!gitAddStatus.success) {
  console.log(red('💥 "git add" command failed. Something went wrong.'));
  Deno.exit(1);
}

const gitCommitCmd = Deno.run({
  cmd: [
    "git",
    "commit",
    "-m",
    '"setup wizard"',
  ],
  cwd: `./${repoDir}`,
});

const gitCommitStatus = await gitCommitCmd.status();

if (!gitCommitStatus.success) {
  console.log(red('💥 "git commit" command failed. Something went wrong.'));
  Deno.exit(1);
}

console.log(bold(yellow(`✨ Push changes to your fork! Run: "cd ${repoDir} && git push origin main`)));
Deno.exit();
