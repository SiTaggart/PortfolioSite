import type React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { AppLink } from './AppLink';

interface SiteFooterIconDefinition {
  paths: readonly string[];
  viewBox: string;
}

const siteFooterIcons = {
  twitter: {
    paths: [
      'M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454 c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303 c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412 c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91 c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019 c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541 c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z',
    ],
    viewBox: '0 0 56.693 56.693',
  },
  github: {
    paths: [
      'M60.609,0.445 C27.262,0.445 0.221,27.481 0.221,60.833 C0.221,87.514 17.524,110.15 41.518,118.135 C44.536,118.694 45.644,116.825 45.644,115.23 C45.644,113.79 45.588,109.033 45.562,103.987 C28.762,107.64 25.217,96.862 25.217,96.862 C22.47,89.882 18.512,88.026 18.512,88.026 C13.033,84.278 18.925,84.355 18.925,84.355 C24.989,84.781 28.182,90.578 28.182,90.578 C33.568,99.81 42.309,97.141 45.755,95.598 C46.297,91.695 47.862,89.031 49.589,87.523 C36.176,85.996 22.076,80.818 22.076,57.679 C22.076,51.086 24.435,45.699 28.298,41.47 C27.671,39.949 25.604,33.807 28.883,25.489 C28.883,25.489 33.954,23.866 45.494,31.679 C50.311,30.341 55.477,29.67 60.609,29.647 C65.741,29.67 70.911,30.341 75.737,31.679 C87.263,23.866 92.327,25.489 92.327,25.489 C95.614,33.807 93.546,39.949 92.919,41.47 C96.791,45.699 99.134,51.086 99.134,57.679 C99.134,80.873 85.007,85.98 71.56,87.475 C73.726,89.349 75.656,93.024 75.656,98.658 C75.656,106.738 75.586,113.241 75.586,115.23 C75.586,116.837 76.673,118.72 79.734,118.127 C103.715,110.133 120.996,87.505 120.996,60.833 C120.996,27.481 93.959,0.445 60.609,0.445 M23.093,87.149 C22.96,87.449 22.488,87.539 22.058,87.333 C21.62,87.136 21.374,86.727 21.516,86.426 C21.646,86.117 22.119,86.031 22.556,86.238 C22.995,86.435 23.245,86.848 23.093,87.149 M25.539,89.877 C25.251,90.144 24.688,90.02 24.306,89.598 C23.911,89.177 23.837,88.614 24.129,88.343 C24.426,88.076 24.972,88.201 25.368,88.622 C25.763,89.048 25.84,89.607 25.539,89.877 M27.92,93.355 C27.55,93.612 26.945,93.371 26.571,92.834 C26.201,92.297 26.201,91.653 26.579,91.395 C26.954,91.137 27.55,91.369 27.929,91.902 C28.298,92.448 28.298,93.092 27.92,93.355 M31.182,96.715 C30.851,97.08 30.146,96.982 29.63,96.484 C29.102,95.997 28.955,95.306 29.287,94.941 C29.622,94.575 30.331,94.678 30.851,95.172 C31.375,95.658 31.535,96.354 31.182,96.715 M35.682,98.666 C35.536,99.139 34.857,99.354 34.173,99.153 C33.49,98.946 33.043,98.392 33.181,97.914 C33.323,97.438 34.005,97.214 34.694,97.429 C35.376,97.635 35.824,98.185 35.682,98.666 M40.624,99.028 C40.641,99.526 40.061,99.939 39.343,99.948 C38.621,99.964 38.037,99.561 38.029,99.071 C38.029,98.568 38.596,98.159 39.318,98.147 C40.036,98.133 40.624,98.533 40.624,99.028 M45.223,98.245 C45.309,98.731 44.81,99.23 44.097,99.363 C43.396,99.491 42.747,99.191 42.658,98.709 C42.571,98.211 43.079,97.712 43.779,97.583 C44.493,97.459 45.132,97.751 45.223,98.245',
    ],
    viewBox: '0 0 121 119',
  },
  linkedin: {
    paths: [
      'M30.071,27.101v-0.077c-0.016,0.026-0.033,0.052-0.05,0.077H30.071z',
      'M49.265,4.667H7.145c-2.016,0-3.651,1.596-3.651,3.563v42.613c0,1.966,1.635,3.562,3.651,3.562h42.12 c2.019,0,3.654-1.597,3.654-3.562V8.23C52.919,6.262,51.283,4.667,49.265,4.667z M18.475,46.304h-7.465V23.845h7.465V46.304z M14.743,20.777h-0.05c-2.504,0-4.124-1.725-4.124-3.88c0-2.203,1.67-3.88,4.223-3.88c2.554,0,4.125,1.677,4.175,3.88 C18.967,19.052,17.345,20.777,14.743,20.777z M45.394,46.304h-7.465V34.286c0-3.018-1.08-5.078-3.781-5.078 c-2.062,0-3.29,1.389-3.831,2.731c-0.197,0.479-0.245,1.149-0.245,1.821v12.543h-7.465c0,0,0.098-20.354,0-22.459h7.465v3.179 c0.992-1.53,2.766-3.709,6.729-3.709c4.911,0,8.594,3.211,8.594,10.11V46.304z',
    ],
    viewBox: '0 0 56.693 56.693',
  },
} satisfies Record<string, SiteFooterIconDefinition>;

type SiteFooterIconName = keyof typeof siteFooterIcons;

export function StyledSiteFooter(props: React.PropsWithChildren): React.ReactElement {
  return (
    <Box
      as="footer"
      marginLeft={['space0', 'space50', 'space100']}
      marginRight={['space0', 'space50', 'space100']}
      marginTop="space180"
      paddingBottom="space140"
      paddingTop="space70"
      {...props}
    />
  );
}

export function SiteFooterList(props: React.PropsWithChildren): React.ReactElement {
  return (
    <Box
      alignItems="center"
      as="ul"
      display="flex"
      justifyContent="space-between"
      margin="space0"
      padding="space0"
      {...props}
    />
  );
}

export function SiteFooterListItem(props: React.PropsWithChildren): React.ReactElement {
  return <Box as="li" listStyleType="none" {...props} />;
}

export function SiteFooterIconWrapper(props: React.PropsWithChildren): React.ReactElement {
  return (
    <Text
      _hover={{
        color: 'colorTextLink',
      }}
      as="span"
      color="colorTextBrandHighlight"
      display="flex"
      {...props}
    />
  );
}

interface SiteFooterIconProps {
  name: SiteFooterIconName;
}

function SiteFooterIcon({ name }: SiteFooterIconProps): React.ReactElement {
  const icon = siteFooterIcons[name];

  return (
    <Box aria-hidden="true" as="span" display="block" height="sizeIcon90" width="sizeIcon90">
      <svg
        aria-hidden="true"
        focusable="false"
        height="100%"
        style={{ display: 'block', fill: 'currentColor' }}
        viewBox={icon.viewBox}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icon.paths.map((path) => (
          <path key={path} d={path} />
        ))}
      </svg>
    </Box>
  );
}

export function SiteFooter(): React.ReactElement {
  return (
    <StyledSiteFooter>
      <SiteFooterList>
        <SiteFooterListItem>
          <AppLink to="/">Home</AppLink>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.twitter.com/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon name="twitter" />
              <ScreenReaderOnly>Find me on Twitter</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.github.com/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon name="github" />
              <ScreenReaderOnly>Find me on GitHub</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.linkedin.com/in/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon name="linkedin" />
              <ScreenReaderOnly>Find me on LinkedIn</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
      </SiteFooterList>
    </StyledSiteFooter>
  );
}
