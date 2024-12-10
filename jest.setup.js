import '@testing-library/jest-dom'
import 'next/navigation'
import { fetch, Request, Response } from 'cross-fetch'

global.fetch = fetch
global.Request = Request
global.Response = Response 