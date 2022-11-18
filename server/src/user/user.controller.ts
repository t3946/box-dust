import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { MailService } from '@src/app/services/mail.service';
import CreateUserDto from '@src/user/dto/create-user.dto';
import UpdateUserDto from '@src/user/dto/update-user.dto';
import { User } from '@src/auth/decorators/user.decorator';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Record<any, any>> {
    const { user, errors } = await this.userService.create(createUserDto);

    if (errors) {
      throw new HttpException(errors, HttpStatus.FORBIDDEN);
    }

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  public async update(
    @User() user: Record<any, any>,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Record<any, any>> {
    const { user: userUpdated, errors } = await this.userService.update(
      updateUserDto,
      user.user_id,
    );

    if (errors) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return userUpdated;
  }

  @Get('register/send-confirm-email')
  @HttpCode(HttpStatus.OK)
  public async sendConfirmEmail(@Query('email') email: string): Promise<void> {
    const { code, errors } = await this.userService.getConfirmEmailCode(email);

    if (errors) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    await this.mailService.sendRegisterConfirm(email, code);
  }

  @Get('register/confirm-email')
  @HttpCode(HttpStatus.OK)
  public async registerConfirm(
    @Query('email') email: string,
    @Query('code') code: string,
  ): Promise<Record<any, any>> {
    const { user, errors } = await this.userService.confirmUser(email, code);

    if (errors) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    return { user };
  }

  @Get('play')
  @HttpCode(HttpStatus.OK)
  public async play(
    @User() user: Record<any, any>,
    @Query('boxId') boxId: string,
  ): Promise<Record<any, any>> {
    const { errors, prize } = await this.userService.play(
      user.user_id,
      parseInt(boxId),
    );

    if (errors) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    return { prize };
  }

  @Get('change-partnership')
  @HttpCode(HttpStatus.OK)
  public async updatePartnership(
    @User() user: Record<any, any>,
    @Query('partnerShipSlug') partnerShipSlug: string,
  ): Promise<void> {
    const { errors } = await this.userService.updatePartnership(
      user.user_id,
      partnerShipSlug,
    );

    if (errors) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
  }
}

export default UserController;
