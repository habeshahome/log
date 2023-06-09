declare let LogRocket: LR.LogRocket;

export = LogRocket;

declare module LR {
  interface IRequest {
    reqId: string;
    url: string;
    headers: { [key: string]: string | undefined };
    body?: string;
    method: string;
    referrer?: string;
    mode?: string;
    credentials?: string;
  }

  interface IResponse {
    reqId: string;
    status?: number;
    headers: { [key: string]: string | undefined };
    body?: string;
    method: string;
  }

  interface IOptions {
    release?: string,
    console?: {
      isEnabled?: boolean | {
        log?: boolean,
        info?: boolean,
        debug?: boolean,
        warn?: boolean,
        error?: boolean
      },
      shouldAggregateConsoleErrors?: boolean,
    },
    network?: {
      isEnabled?: boolean,
      requestSanitizer?(request: IRequest): null | IRequest,
      responseSanitizer?(response: IResponse): null | IResponse,
    },
    browser?: {
      urlSanitizer?(url: string): null | string,
    },
    dom?: {
      isEnabled?: boolean,
      baseHref?: string,
      textSanitizer?: boolean | string,
      inputSanitizer?: boolean | string,
      privateAttributeBlocklist?: string[],
    },

    /** Controls collection of IP addresses and related features, such as GeoIP */
    shouldCaptureIP?: boolean,

    /**
      * Enable sharing sessions across subdomains by setting this to the top-level hostname.
      * */
    rootHostname?: string,

    /**
     * Convenience option for configuring the SDK for an on-prem install.
     * Include the protocol (eg. https://ingest.example.com)
     * */
    ingestServer?: string,

    /**
     * Convenience option for configuring
     * where the full SDK should be loaded from for on-prem installs
     * */
    sdkServer?: string,

    uploadTimeInterval?: number,

    /** a callback which determines whether to send data at a particular moment of time. * */
    shouldSendData?(): boolean,

    shouldDebugLog?: boolean,

    mergeIframes?: boolean,

    /**
     * Controls domains to which a parent window can post messages
     * in order to merge recording with cross-domain iframes
     * */
    childDomains?: string[] | null,

    /**
     * Controls domain to which an iframe window can post messages
     * in order to merge recording with a cross-domain parent window
     * */
    parentDomain?: string | null,

    shouldAugmentNPS?: boolean,

    shouldParseXHRBlob?: boolean,

    /** Controls automatic detection of JS errors using Raven.js
     *  Does not impact captureException or aggregation of console errors
     */
    shouldDetectExceptions?: boolean,
  }

  interface IUserTraits {
    [propName: string]: string | number | boolean,
  }

  type State = { [key: string]: any };
  type Action = { [key: string]: any };

  interface IReduxMiddlewareOptions {
    /** Sanitizer function to scrub redux state */
    stateSanitizer?(state: State): State,
    /** Sanitizer function to scrub or ignore specific redux actions */
    actionSanitizer?(action: Action): null | Action,
  }

  interface ICaptureOptions {
    tags?: {
      [tagName: string]: string | number | boolean,
    },
    extra?: {
      [tagName: string]: string | number | boolean,
    },
  }

  type TrackEventProperties = {
    revenue?: number,
    [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined
  };

  interface LogRocket {
    /** Configures LogRocket */
    init(
      /** Your LogRocket appID (find it in LogRocket settings) */
      appID: string,
      /** Optional configuration to change what LogRocket records */
      options?: IOptions
    ): void;

    // logging functions
    log(...props: any[]): void;
    info(...props: any[]): void;
    warn(...props: any[]): void;
    error(...props: any[]): void;
    debug(...props: any[]): void;

    /** Identify a user with the current session, with optional user traits */
    identify(uid: string, traits?: IUserTraits): void;
    identify(traits: IUserTraits): void;

    /** Returns a redux middleware which adds redux logs to LogRocket sessions */
    reduxMiddleware(
      /** Optional sanitizer configuration */
      options?: IReduxMiddlewareOptions
    ): any;

    /** Send an event to LogRocket */
    track(eventName: string, eventProperties?: TrackEventProperties): void;

    /** Start a new session and end the current one */
    startNewSession(): void;

    /** Get the current session URL in a callback function */
    getSessionURL(
      /** Callback to get session URL */
      callback: (sessionURL: string) => void
    ): void;

    /** Current SDK version if LogRocket has been loaded, undefined otherwise */
    version: string | undefined;

    /** Current session URL if LogRocket has been loaded, null otherwise */
    sessionURL: string | null;

    /** Manually report string errors to LogRocket */
    captureMessage(
      /** identifier */
      message: string,
      /** error metadata */
      options?: ICaptureOptions
    ): void;

    /** Manually report exceptions to LogRocket */
    captureException(
      /** Error instance */
      exception: Error,
      /** Error metadata */
      options?: ICaptureOptions
    ): void;
  }
}
