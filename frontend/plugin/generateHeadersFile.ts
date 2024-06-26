import { writeFileSync } from 'fs'

export const generateHeadersFile = (csp: string) => {
  const headers: any = {
    '/*': {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'microphone=(),camera=()',
      'Content-Security-Policy': csp,
      'X-XSS-Protection': '1',
    },
  }
  let _headers = ''
  for (const uri of Object.keys(headers)) {
    _headers += `${uri}\n`
    for (const header of Object.keys(headers[uri])) {
      _headers += `  ${header}: ${headers[uri][header]}\n`
    }
  }
  writeFileSync(`${__dirname}/../dist/_headers.txt`, _headers)
  return
}
