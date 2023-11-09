import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../common/styles/globals.css';
import { Layout } from 'components';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Layout childComponent={<Component {...pageProps} />} />
		</RecoilRoot>
	);
}
