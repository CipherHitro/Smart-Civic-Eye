import Layout from './components/Layout';
import Header from './components/Header';
import CaptureButton from './components/CaptureButton';
import StatsFooter from './components/StatsFooter';
import { setAllEmailsToTest } from './utils/updateEmails'
import './App.css';

function App() {
  return (
    <Layout>
      <Header />
      <CaptureButton />
      <StatsFooter />
    </Layout>
  );
}

export default App;
