﻿/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.12.7.0 (NJsonSchema v9.10.6.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class AnimeServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @bangumiId (optional) 
     * @skip (optional) 
     * @take (optional) 
     * @return Success
     */
    getlist(bangumiId: string | null, skip: number | null, take: number | null): Observable<Anime[]> {
        let url_ = this.baseUrl + "/api/anime/getlist?";
        if (bangumiId !== undefined)
            url_ += "bangumiId=" + encodeURIComponent("" + bangumiId) + "&"; 
        if (skip !== undefined)
            url_ += "skip=" + encodeURIComponent("" + skip) + "&"; 
        if (take !== undefined)
            url_ += "take=" + encodeURIComponent("" + take) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGetlist(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processGetlist(response_);
                } catch (e) {
                    return <Observable<Anime[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Anime[]>><any>Observable.throw(response_);
        });
    }

    protected processGetlist(response: HttpResponse<Blob>): Observable<Anime[]> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Anime.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Anime[]>(<any>null);
    }

    /**
     * @input (optional) 
     * @return Success
     */
    update(bangumiId: string, input: Anime | null): Observable<void> {
        let url_ = this.baseUrl + "/api/anime/{bangumiId}/update";
        if (bangumiId === undefined || bangumiId === null)
            throw new Error("The parameter 'bangumiId' must be defined.");
        url_ = url_.replace("{bangumiId}", encodeURIComponent("" + bangumiId)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processUpdate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processUpdate(response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processUpdate(response: HttpResponse<Blob>): Observable<void> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @animeId (optional) 
     * @return Success
     */
    getdetail(animeId: string | null): Observable<AnimeDetail> {
        let url_ = this.baseUrl + "/api/anime/getdetail?";
        if (animeId !== undefined)
            url_ += "animeId=" + encodeURIComponent("" + animeId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGetdetail(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processGetdetail(response_);
                } catch (e) {
                    return <Observable<AnimeDetail>><any>Observable.throw(e);
                }
            } else
                return <Observable<AnimeDetail>><any>Observable.throw(response_);
        });
    }

    protected processGetdetail(response: HttpResponse<Blob>): Observable<AnimeDetail> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? AnimeDetail.fromJS(resultData200) : new AnimeDetail();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<AnimeDetail>(<any>null);
    }

    /**
     * @input (optional) 
     * @return Success
     */
    addresource(input: AddResourceDto | null): Observable<void> {
        let url_ = this.baseUrl + "/api/anime/addresource";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processAddresource(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processAddresource(response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAddresource(response: HttpResponse<Blob>): Observable<void> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @input (optional) 
     * @return Success
     */
    updateDetail(input: AnimeDetail | null): Observable<void> {
        let url_ = this.baseUrl + "/api/anime/updateDetail";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processUpdateDetail(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processUpdateDetail(response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processUpdateDetail(response: HttpResponse<Blob>): Observable<void> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

@Injectable()
export class BangumiServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @skip (optional) 
     * @take (optional) 
     * @return Success
     */
    getlist(skip: number | null, take: number | null): Observable<Bangumi[]> {
        let url_ = this.baseUrl + "/api/bangumi/getlist?";
        if (skip !== undefined)
            url_ += "skip=" + encodeURIComponent("" + skip) + "&"; 
        if (take !== undefined)
            url_ += "take=" + encodeURIComponent("" + take) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGetlist(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processGetlist(response_);
                } catch (e) {
                    return <Observable<Bangumi[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Bangumi[]>><any>Observable.throw(response_);
        });
    }

    protected processGetlist(response: HttpResponse<Blob>): Observable<Bangumi[]> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Bangumi.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Bangumi[]>(<any>null);
    }
}

@Injectable()
export class BannerServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @banner (optional) 
     * @return Success
     */
    add(banner: Banner | null): Observable<void> {
        let url_ = this.baseUrl + "/api/banner/add";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(banner);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processAdd(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processAdd(response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAdd(response: HttpResponse<Blob>): Observable<void> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @skip (optional) 
     * @take (optional) 
     * @return Success
     */
    getList(skip: number | null, take: number | null): Observable<Banner[]> {
        let url_ = this.baseUrl + "/api/banner/getList?";
        if (skip !== undefined)
            url_ += "skip=" + encodeURIComponent("" + skip) + "&"; 
        if (take !== undefined)
            url_ += "take=" + encodeURIComponent("" + take) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGetList(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processGetList(response_);
                } catch (e) {
                    return <Observable<Banner[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Banner[]>><any>Observable.throw(response_);
        });
    }

    protected processGetList(response: HttpResponse<Blob>): Observable<Banner[]> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Banner.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Banner[]>(<any>null);
    }
}

@Injectable()
export class ApiServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @fileName (optional) 
     * @return Success
     */
    migrate(fileName: string | null): Observable<void> {
        let url_ = this.baseUrl + "/api/migrate?";
        if (fileName !== undefined)
            url_ += "fileName=" + encodeURIComponent("" + fileName) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processMigrate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponse) {
                try {
                    return this.processMigrate(response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processMigrate(response: HttpResponse<Blob>): Observable<void> {
        const status = response.status; 

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(response.body).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(response.body).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export class Anime implements IAnime {
    title: string | undefined;
    cover: string | undefined;
    playCounts: number | undefined;
    subCounts: number | undefined;
    id: string | undefined;

    constructor(data?: IAnime) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.title = data["title"];
            this.cover = data["cover"];
            this.playCounts = data["playCounts"];
            this.subCounts = data["subCounts"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Anime {
        let result = new Anime();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        data["cover"] = this.cover;
        data["playCounts"] = this.playCounts;
        data["subCounts"] = this.subCounts;
        data["id"] = this.id;
        return data; 
    }
}

export interface IAnime {
    title: string | undefined;
    cover: string | undefined;
    playCounts: number | undefined;
    subCounts: number | undefined;
    id: string | undefined;
}

export class AnimeDetail implements IAnimeDetail {
    animeId: string | undefined;
    desc: string | undefined;
    auth: string | undefined;
    publisher: string | undefined;
    director: string | undefined;
    state: string | undefined;
    type: string | undefined;
    tags: string[] | undefined;
    animes: Resource[] | undefined;
    comics: Resource[] | undefined;
    novels: Resource[] | undefined;
    comments: Comment[] | undefined;
    id: string | undefined;

    constructor(data?: IAnimeDetail) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.animeId = data["animeId"];
            this.desc = data["desc"];
            this.auth = data["auth"];
            this.publisher = data["publisher"];
            this.director = data["director"];
            this.state = data["state"];
            this.type = data["type"];
            if (data["tags"] && data["tags"].constructor === Array) {
                this.tags = [];
                for (let item of data["tags"])
                    this.tags.push(item);
            }
            if (data["animes"] && data["animes"].constructor === Array) {
                this.animes = [];
                for (let item of data["animes"])
                    this.animes.push(Resource.fromJS(item));
            }
            if (data["comics"] && data["comics"].constructor === Array) {
                this.comics = [];
                for (let item of data["comics"])
                    this.comics.push(Resource.fromJS(item));
            }
            if (data["novels"] && data["novels"].constructor === Array) {
                this.novels = [];
                for (let item of data["novels"])
                    this.novels.push(Resource.fromJS(item));
            }
            if (data["comments"] && data["comments"].constructor === Array) {
                this.comments = [];
                for (let item of data["comments"])
                    this.comments.push(Comment.fromJS(item));
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): AnimeDetail {
        let result = new AnimeDetail();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["animeId"] = this.animeId;
        data["desc"] = this.desc;
        data["auth"] = this.auth;
        data["publisher"] = this.publisher;
        data["director"] = this.director;
        data["state"] = this.state;
        data["type"] = this.type;
        if (this.tags && this.tags.constructor === Array) {
            data["tags"] = [];
            for (let item of this.tags)
                data["tags"].push(item);
        }
        if (this.animes && this.animes.constructor === Array) {
            data["animes"] = [];
            for (let item of this.animes)
                data["animes"].push(item.toJSON());
        }
        if (this.comics && this.comics.constructor === Array) {
            data["comics"] = [];
            for (let item of this.comics)
                data["comics"].push(item.toJSON());
        }
        if (this.novels && this.novels.constructor === Array) {
            data["novels"] = [];
            for (let item of this.novels)
                data["novels"].push(item.toJSON());
        }
        if (this.comments && this.comments.constructor === Array) {
            data["comments"] = [];
            for (let item of this.comments)
                data["comments"].push(item.toJSON());
        }
        data["id"] = this.id;
        return data; 
    }
}

export interface IAnimeDetail {
    animeId: string | undefined;
    desc: string | undefined;
    auth: string | undefined;
    publisher: string | undefined;
    director: string | undefined;
    state: string | undefined;
    type: string | undefined;
    tags: string[] | undefined;
    animes: Resource[] | undefined;
    comics: Resource[] | undefined;
    novels: Resource[] | undefined;
    comments: Comment[] | undefined;
    id: string | undefined;
}

export class Resource implements IResource {
    uid: string | undefined;
    name: string | undefined;
    url: string | undefined;
    metaData: MediaMetaData | undefined;

    constructor(data?: IResource) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.uid = data["uid"];
            this.name = data["name"];
            this.url = data["url"];
            this.metaData = data["metaData"] ? MediaMetaData.fromJS(data["metaData"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Resource {
        let result = new Resource();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["uid"] = this.uid;
        data["name"] = this.name;
        data["url"] = this.url;
        data["metaData"] = this.metaData ? this.metaData.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IResource {
    uid: string | undefined;
    name: string | undefined;
    url: string | undefined;
    metaData: MediaMetaData | undefined;
}

export class Comment implements IComment {
    content: string | undefined;
    id: string | undefined;

    constructor(data?: IComment) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.content = data["content"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Comment {
        let result = new Comment();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["content"] = this.content;
        data["id"] = this.id;
        return data; 
    }
}

export interface IComment {
    content: string | undefined;
    id: string | undefined;
}

export class MediaMetaData implements IMediaMetaData {
    duration: number | undefined;
    frameWidth: number | undefined;
    frameHeight: number | undefined;
    frameRate: number | undefined;

    constructor(data?: IMediaMetaData) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.duration = data["duration"];
            this.frameWidth = data["frameWidth"];
            this.frameHeight = data["frameHeight"];
            this.frameRate = data["frameRate"];
        }
    }

    static fromJS(data: any): MediaMetaData {
        let result = new MediaMetaData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["duration"] = this.duration;
        data["frameWidth"] = this.frameWidth;
        data["frameHeight"] = this.frameHeight;
        data["frameRate"] = this.frameRate;
        return data; 
    }
}

export interface IMediaMetaData {
    duration: number | undefined;
    frameWidth: number | undefined;
    frameHeight: number | undefined;
    frameRate: number | undefined;
}

export class AddResourceDto implements IAddResourceDto {
    animeId: string | undefined;
    sourceType: AddResourceDtoSourceType | undefined;
    resources: Resource[] | undefined;

    constructor(data?: IAddResourceDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.animeId = data["animeId"];
            this.sourceType = data["sourceType"];
            if (data["resources"] && data["resources"].constructor === Array) {
                this.resources = [];
                for (let item of data["resources"])
                    this.resources.push(Resource.fromJS(item));
            }
        }
    }

    static fromJS(data: any): AddResourceDto {
        let result = new AddResourceDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["animeId"] = this.animeId;
        data["sourceType"] = this.sourceType;
        if (this.resources && this.resources.constructor === Array) {
            data["resources"] = [];
            for (let item of this.resources)
                data["resources"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IAddResourceDto {
    animeId: string | undefined;
    sourceType: AddResourceDtoSourceType | undefined;
    resources: Resource[] | undefined;
}

export class Bangumi implements IBangumi {
    name: string | undefined;
    animes: Anime[] | undefined;
    id: string | undefined;

    constructor(data?: IBangumi) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            if (data["animes"] && data["animes"].constructor === Array) {
                this.animes = [];
                for (let item of data["animes"])
                    this.animes.push(Anime.fromJS(item));
            }
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Bangumi {
        let result = new Bangumi();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        if (this.animes && this.animes.constructor === Array) {
            data["animes"] = [];
            for (let item of this.animes)
                data["animes"].push(item.toJSON());
        }
        data["id"] = this.id;
        return data; 
    }
}

export interface IBangumi {
    name: string | undefined;
    animes: Anime[] | undefined;
    id: string | undefined;
}

export class Banner implements IBanner {
    image: string | undefined;
    link: string | undefined;
    title: string | undefined;
    id: string | undefined;

    constructor(data?: IBanner) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.image = data["image"];
            this.link = data["link"];
            this.title = data["title"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Banner {
        let result = new Banner();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["image"] = this.image;
        data["link"] = this.link;
        data["title"] = this.title;
        data["id"] = this.id;
        return data; 
    }
}

export interface IBanner {
    image: string | undefined;
    link: string | undefined;
    title: string | undefined;
    id: string | undefined;
}

export enum AddResourceDtoSourceType {
    _0 = 0, 
    _1 = 1, 
    _2 = 2, 
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = function() { 
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob); 
        }
    });
}