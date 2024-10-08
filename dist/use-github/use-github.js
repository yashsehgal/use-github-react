var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
var GITHUB_REST_URL = 'https://api.github.com';
var GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
var GITHUB_RAW_CONTENT_URL = 'https://raw.githubusercontent.com';
var useGitHub = function (_a) {
    var username = _a.username, personalAccessToken = _a.personalAccessToken;
    var _b = useState(null), metadata = _b[0], setMetadata = _b[1];
    var _c = useState(null), userInfo = _c[0], setUserInfo = _c[1];
    var _d = useState([]), repositories = _d[0], setRepositories = _d[1];
    var _e = useState([]), pinnedRepositories = _e[0], setPinnedRepositories = _e[1];
    var _f = useState([]), followers = _f[0], setFollowers = _f[1];
    var _g = useState([]), followings = _g[0], setFollowings = _g[1];
    var _h = useState(null), profileReadmeContent = _h[0], setProfileReadmeContent = _h[1];
    var fetchGitHubData = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, config, headers, request, status_1, newMetadata, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        return [2 /*return*/, null];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get("".concat(GITHUB_REST_URL, "/users/").concat(username))];
                case 2:
                    response = _a.sent();
                    data = response.data, config = response.config, headers = response.headers, request = response.request, status_1 = response.status;
                    newMetadata = {
                        GITHUB_API_DATA: data,
                        GITHUB_REQUEST_CONFIG: config,
                        GITHUB_API_HEADERS: headers,
                        GITHUB_API_REQUEST: request,
                        GITHUB_API_STATUS_CODE: status_1,
                    };
                    setMetadata(newMetadata);
                    return [2 /*return*/, newMetadata];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error while fetching GitHub user info:', error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [username]);
    var updateUserInfo = useCallback(function (meta) {
        if (meta && meta.GITHUB_API_STATUS_CODE === 200) {
            setUserInfo(meta.GITHUB_API_DATA);
        }
        else {
            console.error('Error while fetching GitHub user info, Please check network tab for more info');
            console.error('Getting status code', meta ? meta.GITHUB_API_STATUS_CODE : 'Unknown');
            setUserInfo(null);
        }
    }, []);
    var fetchRepositories = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get("".concat(GITHUB_REST_URL, "/users/").concat(username, "/repos?per_page=100&sort=updated"))];
                case 2:
                    response = _a.sent();
                    setRepositories(response.data.map(function (repo) { return (__assign(__assign({}, repo), { language: repo.language
                            ? repo.language.toLowerCase()
                            : null })); }));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error while fetching repositories:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [username]);
    var fetchPinnedRepositories = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, response, pinnedRepos, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username || !personalAccessToken)
                        return [2 /*return*/];
                    query = "\n      query {\n        user(login: \"".concat(username, "\") {\n          pinnedItems(first: 6, types: REPOSITORY) {\n            nodes {\n              ... on Repository {\n                id\n                name\n                description\n                url\n                stargazerCount\n                forkCount\n                primaryLanguage {\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    ");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post(GITHUB_GRAPHQL_URL, { query: query }, {
                            headers: {
                                Authorization: "Bearer ".concat(personalAccessToken),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    pinnedRepos = response.data.data.user.pinnedItems.nodes.map(function (repo) { return ({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description,
                        html_url: repo.url,
                        stargazers_count: repo.stargazerCount,
                        forks_count: repo.forkCount,
                        language: repo.primaryLanguage
                            ? repo.primaryLanguage.name.toLowerCase()
                            : null,
                    }); });
                    setPinnedRepositories(pinnedRepos);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error while fetching pinned repositories:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [username, personalAccessToken]);
    var fetchFollowers = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, followerPromises, followerResponses, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios.get("".concat(GITHUB_REST_URL, "/users/").concat(username, "/followers?per_page=100"))];
                case 2:
                    response = _a.sent();
                    followerPromises = response.data.map(function (follower) {
                        return axios.get(follower.url);
                    });
                    return [4 /*yield*/, Promise.all(followerPromises)];
                case 3:
                    followerResponses = _a.sent();
                    setFollowers(followerResponses.map(function (response) { return response.data; }));
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error while fetching followers:', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [username]);
    var fetchFollowings = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, followingPromises, followingResponses, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios.get("".concat(GITHUB_REST_URL, "/users/").concat(username, "/following?per_page=100"))];
                case 2:
                    response = _a.sent();
                    followingPromises = response.data.map(function (following) { return axios.get(following.url); });
                    return [4 /*yield*/, Promise.all(followingPromises)];
                case 3:
                    followingResponses = _a.sent();
                    setFollowings(followingResponses.map(function (response) { return response.data; }));
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error while fetching followings:', error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [username]);
    var fetchProfileReadme = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get("".concat(GITHUB_RAW_CONTENT_URL, "/").concat(username, "/").concat(username, "/main/README.md"))];
                case 2:
                    response = _a.sent();
                    setProfileReadmeContent(response.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error('Error while fetching profile README:', error_6);
                    setProfileReadmeContent(null);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [username]);
    useEffect(function () {
        fetchGitHubData().then(function (meta) {
            if (meta) {
                updateUserInfo(meta);
            }
        });
        fetchRepositories();
        fetchPinnedRepositories();
        fetchFollowers();
        fetchFollowings();
        fetchProfileReadme();
    }, [
        fetchGitHubData,
        updateUserInfo,
        fetchRepositories,
        fetchPinnedRepositories,
        fetchFollowers,
        fetchFollowings,
        fetchProfileReadme,
    ]);
    var calculateLanguageDistribution = function (repos) {
        var languageCounts = {};
        var totalCount = 0;
        repos.forEach(function (repo) {
            if (repo.language) {
                languageCounts[repo.language] =
                    (languageCounts[repo.language] || 0) + 1;
                totalCount++;
            }
        });
        return Object.entries(languageCounts).map(function (_a) {
            var language = _a[0], count = _a[1];
            return ({
                language: language,
                percentage: count / totalCount,
            });
        });
    };
    var getRepositories = useCallback(function () {
        var createRepositoryGetter = function (repoGetter) {
            var getter = repoGetter;
            getter.languageDistribution = function () {
                return calculateLanguageDistribution(repoGetter());
            };
            return getter;
        };
        return {
            all: createRepositoryGetter(function () { return repositories; }),
            withLanguage: function (languages) {
                return createRepositoryGetter(function () {
                    return repositories.filter(function (repo) { return repo.language && languages.includes(repo.language); });
                });
            },
            top: function (n) {
                return createRepositoryGetter(function () { return repositories.slice(0, n); });
            },
            pinned: createRepositoryGetter(function () { return pinnedRepositories; }),
        };
    }, [repositories, pinnedRepositories]);
    var getFollowers = useCallback(function () { return followers; }, [followers]);
    var getFollowings = useCallback(function () { return followings; }, [followings]);
    var profileReadme = useCallback(function () { return profileReadmeContent; }, [profileReadmeContent]);
    return {
        userInfo: userInfo
            ? __assign(__assign({}, userInfo), { getFollowers: getFollowers, getFollowings: getFollowings, profileReadme: profileReadme }) : null,
        metadata: metadata,
        getRepositories: getRepositories,
    };
};
export { useGitHub };
