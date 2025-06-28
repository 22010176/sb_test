import { Outlet } from 'react-router';

import IllustrationContainer from './IllustrationContainer';
import { ConfigProvider } from 'antd';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">


      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Illustration */}
          <IllustrationContainer />

          {/* Right side - Login Form */}
          <div className="lg:w-1/2 px-10 py-5  flex flex-col justify-center">
            <ConfigProvider theme={{
              components: {
                Form: {
                  verticalLabelPadding: 2,
                  itemMarginBottom: 12,

                },
              },
            }}>
              <Outlet />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuthLayout