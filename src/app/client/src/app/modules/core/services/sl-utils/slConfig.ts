
const pageUrl = window.location.href;
let BASE_URL = "https://api.shikshalokam.org";
if(pageUrl.includes('qa')){
    BASE_URL = "https://qa.bodh.shikshalokam.org"
}
if(pageUrl.includes('staging')){
    BASE_URL = "https://staging.bodh.shikshalokam.org"
}
if(pageUrl.includes('localhost:3000') || pageUrl.includes('dev')){
    BASE_URL = "https://dev.bodh.shikshalokam.org"
}
export const slConfig = {
    BASE_URL: BASE_URL,
    API_URL: {
        GENERATE_AND_LINK_QR_CODE: '/kendra/api/v1/bodh/platform/generate',
        GET_PDF_LINKS: '/kendra/api/v1/qr-codes/pdf',
        SYNC_COURSE:'/kendra/api/v1/bodh/batch/enrol',
        SCROM_CONTENT_CREATE:'/kendra/api/v1/bodh/platform/uploadScromContent?name=',
        GET_ORGANIZATION_LIST:"/kendra/api/v1/organisations/list"
    }

}