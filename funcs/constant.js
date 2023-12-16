const c_stocktype = [
    {
        id: 'msft',
        name: "MSFT",
        icon : '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"/><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"/><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"/><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"/></svg>'
    },
    {
        id: 'apple',
        name: "Apple",
        icon: '<svg fill="#000000" height="48px" width="48px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.773 22.773"><g><g><path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"/><path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"/></g></g></svg>'
    }
];

const c_stockperiod = [
    {
        type: 1,
        catecory: 'MINUTES',
        name: 'Time Series (1min)',
        label: '1 minute',
        abbr: '1m'
    },
    {
        type: 1,
        catecory: 'MINUTES',
        name: 'Time Series (5min)',
        label: '5 minutes',
        abbr: '5m'
    },
    {
        type: 1,
        catecory: 'MINUTES',
        name: 'Time Series (15min)',
        label: '15 minutes',
        abbr: '15min'
    },
    {
        type: 1,
        catecory: 'MINUTES',
        name: 'Time Series (30min)',
        label: '30 minutes',
        abbr: '30min'
    },
    {
        type: 2,
        catecory: 'HOURS',
        name: 'Time Series (60min)',
        label: '1 hour',
        abbr: '1h'
    },
    {
        type: 2,
        catecory: 'HOURS',
        name: 'Time Series (120min)',
        label: '2 hours',
        abbr: '2h'
    },
    {
        type: 2,
        catecory: 'HOURS',
        name: 'Time Series (180min)',
        label: '3 hours',
        abbr: '3h'
    },
    {
        type: 2,
        catecory: 'HOURS',
        name: 'Time Series (240min)',
        label: '4 hours',
        abbr: '4h'
    },
    {
        type: 3,
        catecory: 'DAYS',
        name: 'Time Series (Daily)',
        label: '1 day',
        abbr: '1d'
    },
    {
        type: 3,
        catecory: 'DAYS',
        name: 'Weekly Time Series',
        label: '1 week',
        abbr: '1w'
    },
    {
        type: 3,
        catecory: 'DAYS',
        name: 'Monthly Time Series',
        label: '1 month',
        abbr: '1M'
    },
    {
        type: 3,
        catecory: 'DAYS',
        name: '',
        label: '3 month',
        abbr: '3M'
    }
];

module.exports = {
    c_stocktype,
    c_stockperiod
}