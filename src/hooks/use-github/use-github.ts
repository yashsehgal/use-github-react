import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import {
  IGitHubUserInfo,
  IUseGitHubHookMetadata,
  IUseGitHubHookProps,
  IUseGitHubHookReturn,
  IGitHubRepo,
  ProgrammingLanguage,
} from './interfaces/global';
import { ENVIRONMENT } from '../../helpers/utils';

const GITHUB_REST_URL: string = 'https://api.github.com' as const;
const GITHUB_GRAPHQL_URL: string = 'https://api.github.com/graphql' as const;

const useGitHub = ({ username }: IUseGitHubHookProps): IUseGitHubHookReturn => {
  const [metadata, setMetadata] = useState<IUseGitHubHookMetadata | null>(null);
  const [userInfo, setUserInfo] = useState<IGitHubUserInfo | null>(null);
  const [repositories, setRepositories] = useState<IGitHubRepo[]>([]);
  const [pinnedRepositories, setPinnedRepositories] = useState<IGitHubRepo[]>(
    [],
  );

  console.log('ENV', ENVIRONMENT.GITHUB_ACCESS_TOKEN);

  const fetchGitHubData = useCallback(async () => {
    if (!username) return null;

    try {
      const response = await axios.get(`${GITHUB_REST_URL}/users/${username}`);
      const { data, config, headers, request, status } = response;
      const newMetadata: IUseGitHubHookMetadata = {
        GITHUB_API_DATA: data,
        GITHUB_REQUEST_CONFIG: config,
        GITHUB_API_HEADERS: headers,
        GITHUB_API_REQUEST: request,
        GITHUB_API_STATUS_CODE: status,
      };
      setMetadata(newMetadata);
      return newMetadata;
    } catch (error) {
      console.error('Error while fetching GitHub user info:', error);
      return null;
    }
  }, [username]);

  const updateUserInfo = useCallback((meta: IUseGitHubHookMetadata) => {
    if (meta && meta.GITHUB_API_STATUS_CODE === 200) {
      setUserInfo(meta.GITHUB_API_DATA as IGitHubUserInfo);
    } else {
      console.error(
        'Error while fetching GitHub user info, Please check network tab for more info',
      );
      console.error(
        'Getting status code',
        meta ? meta.GITHUB_API_STATUS_CODE : 'Unknown',
      );
      setUserInfo(null);
    }
  }, []);

  const fetchRepositories = useCallback(async () => {
    if (!username) return;

    try {
      const response = await axios.get(
        `${GITHUB_REST_URL}/users/${username}/repos?per_page=100&sort=updated`,
      );
      setRepositories(
        response.data.map((repo: any) => ({
          ...repo,
          language: repo.language
            ? (repo.language.toLowerCase() as ProgrammingLanguage)
            : null,
        })),
      );
    } catch (error) {
      console.error('Error while fetching repositories:', error);
    }
  }, [username]);

  const fetchPinnedRepositories = useCallback(async () => {
    if (!username) return;

    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await axios.post(
        GITHUB_GRAPHQL_URL,
        { query },
        {
          headers: {
            Authorization: `Bearer ${ENVIRONMENT.GITHUB_ACCESS_TOKEN}`,
          },
        },
      );

      const pinnedRepos = response.data.data.user.pinnedItems.nodes.map(
        (repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          stargazers_count: repo.stargazerCount,
          forks_count: repo.forkCount,
          language: repo.primaryLanguage
            ? (repo.primaryLanguage.name.toLowerCase() as ProgrammingLanguage)
            : null,
        }),
      );

      setPinnedRepositories(pinnedRepos);
    } catch (error) {
      console.error('Error while fetching pinned repositories:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchGitHubData().then((meta) => {
      if (meta) {
        updateUserInfo(meta);
      }
    });
    fetchRepositories();
    fetchPinnedRepositories();
  }, [
    fetchGitHubData,
    updateUserInfo,
    fetchRepositories,
    fetchPinnedRepositories,
  ]);

  const getRepositories = useCallback(() => {
    return {
      all: () => repositories,
      withLanguage: (languages: ProgrammingLanguage[]) => {
        return repositories.filter(
          (repo) => repo.language && languages.includes(repo.language),
        );
      },
      top: (n: number) => repositories.slice(0, n),
      pinned: () => pinnedRepositories,
    };
  }, [repositories, pinnedRepositories]);

  return {
    userInfo,
    metadata,
    getRepositories,
  };
};

export { useGitHub };
