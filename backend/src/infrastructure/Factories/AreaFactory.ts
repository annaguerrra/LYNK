export function makeAreaController() {
    private hashService = new HashService()
        private jwtService = new JwtTokenService()
        private attachmentService = new AttachmentService()
        private userService = new UserService(this.attachmentService, this.hashService, this.jwtService)
        private areaService = new AreaService(this.userService)
}