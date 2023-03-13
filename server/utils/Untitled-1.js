<Route
        path="*"
        element={
          isAuthenticated ? (
            <PrivateRoutes showToast={showToast} />
          ) : (
            <Login showToast={showToast} />
          )
        }
      />