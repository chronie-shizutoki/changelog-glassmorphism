import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import EnhancedChangelogList from './components/changelog/EnhancedChangelogList';
import BackToTop from './components/BackToTop';
import { useTheme } from './hooks/useTheme';
import './i18n';
import './App.css';

function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    // 确保主题正确应用
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // 设置HTML语言属性
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen">


      {/* 主要内容 */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <EnhancedChangelogList />
          </div>
        </main>

        {/* 页脚 */}
        <footer className="py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="glass-card text-center">
              <p className="text-sm opacity-60">
                Made with ❤️ using React & Glassmorphism Design
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* 返回顶部按钮 */}
      <BackToTop />
    </div>
  );
}

export default App;
